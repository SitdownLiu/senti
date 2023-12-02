import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseColumnEntity } from './../../../common/baseColumn.entity';
import { User } from './user.entity';

//角色表
@Entity({ name: 'a_role' })
export class Role extends BaseColumnEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '角色id' })
  id: string;

  @Column({ length: 16, comment: '角色label' })
  name: string;

  @Column({ length: 32, comment: '角色code' })
  code: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
