import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseColumnEntity } from './../../../common/baseColumn.entity';
import { Dictionary } from './dictionary.entity';

//字典类型表
@Entity({ name: 'a_dictionary-type' })
export class DictionaryType extends BaseColumnEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '字典类型id' })
  id: string;

  @Column({ length: 32, comment: '字典类型label' })
  name: string;

  @Column({ length: 64, comment: '字典类型code' })
  code: string;

  @Column({ length: 64, nullable: true, comment: '字典类型说明' })
  remark: string;

  @OneToMany(() => Dictionary, (dictionary) => dictionary.dictionaryType)
  dictionarys: Dictionary[];
}
