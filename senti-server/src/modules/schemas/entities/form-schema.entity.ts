import { BaseColumnEntity } from 'src/common/baseColumn.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('m_form_schema')
export class FormSchema extends BaseColumnEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '表单模型id' })
  id: string;

  @Column({ length: 255, nullable: false, comment: '表单名称' })
  name: string;

  @Column({
    length: 32,
    nullable: false,
    comment: '表单类型：表单引擎，用户自定义',
  })
  type: string;

  @Column({
    length: 32,
    nullable: false,
    comment: '应用类型：vue3, react18, angular15',
  })
  appType: string;

  @Column({
    length: 32,
    nullable: true,
    comment: '表单引擎类型（表单类型为[FormEngine]）',
  })
  formEngineType: string;

  @Column({
    length: 255,
    nullable: true,
    comment: '表单Url地址（表单类型为[FormUrl]）',
  })
  formUrl: string;

  @Column({ type: 'json', nullable: true, comment: '设计模型（JSON）' })
  jsonSchema: string;

  @Column({ type: 'longtext', nullable: true, comment: '设计模型（XML）' })
  xmlSchema: string;

  @Column({ type: 'json', nullable: true, comment: '按钮配置' })
  btnConfig: string;

  @Column({ type: 'longtext', nullable: true, comment: '数据模型' })
  dataSchema: string;

  @Column({ length: 255, nullable: true, comment: '备注' })
  remark: string;

  @Column({ type: 'json', nullable: true, comment: '其他配置' })
  otherConfig: string;

  @Column({ default: 800, nullable: true, comment: '表单宽度' })
  width: number;
}
