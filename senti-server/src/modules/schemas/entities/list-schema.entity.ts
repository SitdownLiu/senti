import { BaseColumnEntity } from 'src/common/baseColumn.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('m_list_schema')
export class ListSchema extends BaseColumnEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '列表模型id' })
  id: string;

  @Column({ length: 255, nullable: false, comment: '列表名称' })
  name: string;

  @Column({ length: 32, nullable: false, comment: '列表类型：ListEngine-列表引擎，ListUrl-用户自定义' })
  type: string;

  @Column({
    length: 255,
    nullable: true,
    comment: '列表Url地址（列表类型为[ListUrl]）',
  })
  listUrl: string;

  @Column({ comment: '数据库表名' })
  tableName: string;

  @Column({ type: 'json', comment: '行模型（列表类型为[ListEngine]）' })
  rowModel: string;

  @Column({ type: 'json', comment: '列配置（列表类型为[ListEngine]）' })
  columnConfig: string;

  @Column({ type: 'json', comment: '事件配置（列表类型为[ListEngine]）' })
  eventConfig: string;

  @Column({ type: 'json', comment: '按钮配置（列表类型为[ListEngine]）' })
  buttonConfig: string;

  @Column({ type: 'json', comment: '全局配置（列表类型为[ListEngine]）' })
  globalConfig: string;

  @Column({ length: 32, comment: 'OR映射id' })
  ormappingId: string;
}
