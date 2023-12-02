import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PageDto } from './../../../common/base.tdo';

export class AddOrUpdateDictionaryDto {
  @ApiProperty({ required: false, description: '字典id' })
  id: string;

  @ApiProperty({ description: '字典label' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '字典code' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ required: false, description: '字典说明' })
  remark: string;

  @ApiProperty({ description: '字典类型id' })
  dictionaryTypeId: string;
}

export class QueryDictionaryDto {
  @ApiProperty({ required: false, description: '字典类型id' })
  typeId: string;

  @ApiProperty({ required: false, description: '字典类型code' })
  typeCode: string;
}

export class DeleteDictionaryDto {
  @ApiProperty({ description: '字典id' })
  @IsNotEmpty()
  id: string;
}

export class ResDicDto {
  @ApiProperty({ description: '字典id' })
  dicId: string;

  @ApiProperty({ description: '字典label' })
  dicName: string;

  @ApiProperty({ description: '字典code' })
  dicCode: string;

  @ApiProperty({ description: '字典类型id' })
  typeId: string;

  @ApiProperty({ description: '字典类型label' })
  typeName: string;

  @ApiProperty({ description: '字典类型code' })
  typeCode: string;
}
