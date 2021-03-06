import { PaginationGetDto, PaginationResSchemaDto } from '@letscollab/helper';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';
import { OrgEntity } from './org.entity';

export class CreateOrgDto {
  @ApiPropertyOptional({
    description: 'Team name',
    default: 'letscollab',
  })
  @IsString()
  name: string;

  @ApiProperty({
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

export class UpdateOrgDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Team name',
    default: 'letscollab',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'public email',
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

export class DeleteOrgDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class QueryOrgDto extends PaginationGetDto {
  @ApiPropertyOptional({
    nullable: true,
  })
  @IsOptional()
  name?: string;
}

export class QueryOrgResDto extends PaginationResSchemaDto {
  @ApiPropertyOptional({
    type: () => OrgEntity,
  })
  d?: OrgEntity;
}

// export class QueryOrgResDto extends PaginationGetDto {
//   @ApiPropertyOptional({
//     nullable: true,
//   })
//   @IsOptional()
//   name?: string;
// }
