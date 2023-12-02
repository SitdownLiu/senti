import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseColumnEntity } from './../../../common/baseColumn.entity';
import { DictionaryType } from './dictionary-type.entity';

//字典表
@Entity({ name: 'a_dictionary' })
export class Dictionary extends BaseColumnEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '字典id' })
  id: string;

  @Column({ length: 32, comment: '字典label' })
  name: string;

  @Column({ length: 64, comment: '字典code' })
  code: string;

  @ManyToOne(
    () => DictionaryType,
    (dictionaryType) => dictionaryType.dictionarys,
  )
  dictionaryType: string;
}
