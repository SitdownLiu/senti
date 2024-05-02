import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PageDto } from 'src/common/base.tdo';

// 动态列表类型选项
export enum ListTypeEnum {
  ListEngine = 'ListEngine',
  ListUrl = 'ListUrl',
}

// 动态列表模型信息
export class ListSchemaInfoDto {
  @ApiProperty({ required: false, description: '动态列表模型id' })
  id: string;

  @ApiProperty({ description: '动态列表名称' })
  @IsNotEmpty({ message: '[动态列表名称]必填' })
  name: string;

  @ApiProperty({
    enum: ListTypeEnum,
    description: '列表类型：ListEngine-列表引擎，ListUrl-用户自定义',
  })
  @IsNotEmpty({ message: '[动态列表类型]必填' })
  @IsEnum(ListTypeEnum)
  type: string;

  @ApiProperty({
    required: false,
    description: '动态列表Url地址（列表类型为[ListUrl]）',
  })
  listUrl: string;

  @ApiProperty({
    required: false,
    description: '数据库表名（列表类型为[ListEngine]）',
  })
  tableName: string;

  @ApiProperty({
    required: false,
    description: 'OR映射id',
  })
  ormappingId: string;

  @ApiProperty({ required: false, description: '行模型（列表类型为[ListEngine]）' })
  rowModel: string[];

  @ApiProperty({ required: false, description: '列配置（列表类型为[ListEngine]）' })
  columnConfig: object;

  @ApiProperty({ required: false, description: '事件配置（列表类型为[ListEngine]）' })
  eventConfig: object;

  @ApiProperty({ required: false, description: '按钮配置（列表类型为[ListEngine]）' })
  buttonConfig: object;

  @ApiProperty({ required: false, description: '全局配置（列表类型为[ListEngine]）' })
  globalConfig: object;
}

// 动态模型 -分页查询参数
export class PageListSchemaDto extends PageDto {
  @ApiProperty({ required: false, description: '动态列表模型id' })
  id?: string;

  @ApiProperty({ required: false, description: '动态列表名称' })
  name?: string;

  @ApiProperty({
    enum: ListTypeEnum,
    description: '列表类型：ListEngine-列表引擎，ListUrl-用户自定义',
  })
  type?: string;
}

export class PageListSchemaRes {
  @ApiProperty({ description: '总条数' })
  total: number;

  @ApiProperty({ type: [ListSchemaInfoDto], description: '结果集' })
  list: [];
}

export class ListSchemaIdDto {
  @ApiProperty({ required: true, description: '动态列表模型id' })
  @IsNotEmpty({ message: '[动态列表模型主键id]必填' })
  id: string;
}

// 动态列表模型 -修改分页列表数据参数
export class PatchListSchemaListDto {
  @ApiProperty({ required: false, description: '动态列表名称' })
  name: string;

  @ApiProperty({
    required: false,
    enum: ListTypeEnum,
    description: '列表类型：ListEngine-列表引擎，ListUrl-用户自定义',
  })
  type: string;

  @ApiProperty({
    required: false,
    description: '动态列表Url地址（列表类型为[ListUrl]）',
  })
  listUrl: string;

  @ApiProperty({
    required: false,
    description: '数据库表名（列表类型为[ListEngine]）',
  })
  tableName: string;

  @ApiProperty({
    required: false,
    description: 'OR映射id',
  })
  ormappingId: string;
}

// 动态列表模型 -修改详细配置参数
export class PatchListSchemaConfigDto {
  @ApiProperty({ required: false, description: '行模型（列表类型为[ListEngine]）' })
  rowModel: string[];

  @ApiProperty({ required: false, description: '列配置（列表类型为[ListEngine]）' })
  columnConfig: object;

  @ApiProperty({ required: false, description: '事件配置（列表类型为[ListEngine]）' })
  eventConfig: object;

  @ApiProperty({ required: false, description: '按钮配置（列表类型为[ListEngine]）' })
  buttonConfig: object;

  @ApiProperty({ required: false, description: '全局配置（列表类型为[ListEngine]）' })
  golobalConfig: object;
}
