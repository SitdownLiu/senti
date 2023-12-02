import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseColumnEntity } from './../../../common/baseColumn.entity';

//私有应用表
@Entity({ name: 'a_private-app' })
export class PrivateApp extends BaseColumnEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '应用id' })
  id: string;

  @Column({ length: 64, comment: '应用密钥' })
  secretKey: string;

  @Column({ length: 256, nullable: true, comment: '应用说明' })
  remark: string;

  @Column({ length: 32, comment: '应用名称' })
  name: string;
}
