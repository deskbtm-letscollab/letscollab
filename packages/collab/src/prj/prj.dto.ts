import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePrjDto {
  @ApiProperty({
    description: 'Project name',
    default: 'letscollab',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Github repository URI',
    default: 'letscollab',
    required: true,
  })
  @IsString()
  githubRepoUrl: string;

  @ApiProperty({
    description: 'Public email',
    default: 'deskbtm@outlook.com',
  })
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
    },
  )
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({
    default: 'xxxxxx',
  })
  @IsOptional()
  description: string;
}

export class UpdatePrjDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '团队名称',
    default: 'letscollab',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: '公开邮箱',
    default: 'deskbtm@outlook.com',
  })
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
    },
  )
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({
    default: 'xxxxxx',
  })
  @IsOptional()
  description: string;
}

export class QueryPrjDto {}

export class DeletePrjDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
