import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { readJsonSync } from 'fs-extra';
import { writeOpenApiDoc } from '@letscollab/helper';
import { MailModule } from '../mail';

const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const options = new DocumentBuilder()
        .setTitle('Message Api')
        .setDescription('发布邮件，消息，通知等等')
        .setVersion(pkg.version)
        .build();

      const smgDoc = SwaggerModule.createDocument(app, options, {
        include: [MailModule],
      });

      SwaggerModule.setup('api/doc/msg', app, smgDoc);

      await writeOpenApiDoc({
        name: 'Message',
        pkgName: pkg.name,
        pkgVersion: pkg.version,
        content: smgDoc,
      });
    } catch (e) {
      console.log(e);
    } finally {
      resolve(null);
    }
  });
