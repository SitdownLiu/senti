import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PageDto } from './../../../common/base.tdo';

// 表单类型选项
export enum FormTypeEnum {
  FormEngine = 'FormEngine',
  FormUrl = 'FormUrl',
}

// 表单模型信息
export class FormSchemaInfoDto {
  @ApiProperty({ required: false, description: '表单模型id' })
  id: string;

  @ApiProperty({ description: '表单名称' })
  @IsNotEmpty({ message: '[表单名称]必填' })
  name: string;

  @ApiProperty({
    enum: FormTypeEnum,
    description: '表单类型：表单引擎，用户自定义',
  })
  @IsNotEmpty({ message: '[表单类型]必填' })
  @IsEnum(FormTypeEnum)
  type: string;

  @ApiProperty({
    required: false,
    description: '表单引擎类型（表单类型为[FormEngine]）',
  })
  formEngineType: string;

  @ApiProperty({
    required: false,
    description: '表单Url地址（表单类型为[FormUrl]）',
  })
  formUrl: string;

  @ApiProperty({ required: false, description: 'Json_Schema' })
  jsonSchema: object;

  @ApiProperty({ required: false, description: 'XML_Schema' })
  xmlSchema: string;

  @ApiProperty({ required: false, description: '按钮配置' })
  btnConfig: object;

  @ApiProperty({ required: false, description: '备注' })
  remark: string;
}

// 表单模型 -分页查询参数
export class PageFormSchemaDto extends PageDto {
  @ApiProperty({ required: false, description: '表单名称' })
  name?: string;

  @ApiProperty({
    required: false,
    enum: FormTypeEnum,
    description: '表单类型：表单引擎，用户自定义',
  })
  type?: string;

  @ApiProperty({
    required: false,
    description: '表单引擎类型（表单类型为[FormEngine]）',
  })
  formEngineType?: string;
}

export class PageFormSchemaRes {
  @ApiProperty({ description: '总条数' })
  total: number;

  @ApiProperty({ type: [FormSchemaInfoDto], description: '结果集' })
  list: [];
}

// 表单模型 -通过主键id操作的接口参数
export class FormSchemaIdDto {
  @ApiProperty({ required: true, description: '表单模型id' })
  @IsNotEmpty({ message: '[表单模型主键id]必填' })
  id: string;
}

// 表单模型 -修改表单模型列表数据参数
export class PatchFormSchemaListDto {
  @ApiProperty({ required: false, description: '表单名称' })
  name: string;

  @ApiProperty({
    required: false,
    enum: FormTypeEnum,
    description: '表单类型：表单引擎，用户自定义',
  })
  type: string;

  @ApiProperty({
    required: false,
    description: '表单引擎类型（表单类型为[FormEngine]）',
  })
  formEngineType: string;

  @ApiProperty({
    required: false,
    description: '表单Url地址（表单类型为[FormUrl]）',
  })
  formUrl: string;

  @ApiProperty({ required: false, description: '备注' })
  remark: string;
}
