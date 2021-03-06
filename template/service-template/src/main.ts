import { NacosConfigService } from '@letscollab/nest-nacos';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { FormatExceptionFilter } from '@letscollab/helper';
import { setupAuthApiDoc } from './utils';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: true,
      logger: isDevelopment ? ['verbose'] : ['error', 'warn'],
    },
  );

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const nacosConfigService: NacosConfigService =
    app.get<NacosConfigService>(NacosConfigService);

  const nacosConfigs = await nacosConfigService.getConfig('service-auth.json');

  !isProduction && (await setupAuthApiDoc(app));

  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(nestWinston);

  app.useGlobalFilters(
    new FormatExceptionFilter(),
    // new FormatExceptionFilter(nestWinston.logger),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: nacosConfigs.rabbitmq.urls,
      queue: 'auth_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(
    configService.get('app.port'),
    configService.get('app.hostname'),
  );
}

bootstrap();
