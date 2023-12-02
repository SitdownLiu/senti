import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PageDto } from '../../../common/base.tdo';

//添加或修改字典类型
export class AddOrUpdateDictionaryTypeDto {
  @ApiProperty({ required: false, description: '字典类型id' })
  id: string;

  @ApiProperty({ description: '字典类型label' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '字典类型code' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ required: false, description: '字典类型说明' })
  remark: string;
}

//查询字典类型
export class QueryDictionaryTypeDto extends PageDto {
  @ApiProperty({ required: false, description: '字典类型label' })
  name: string;
}

//删除字典类型
export class DeleteDictionaryTypeDto {
  @ApiProperty({ description: '字典类型id' })
  @IsString()
  id: string;
}

export class ResDicTypeDto extends AddOrUpdateDictionaryTypeDto {}
