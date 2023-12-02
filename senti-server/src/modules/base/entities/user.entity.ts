import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseColumnEntity } from '../../../common/baseColumn.entity';
import { Role } from './role.entity';

//用户信息表
@Entity({ name: 'a_user' })
export class User extends BaseColumnEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '用户id' })
  id: string;

  @Column({ length: 32, unique: true, comment: '登录账号' })
  account: string;

  @Column({ length: 32, comment: '登录密码' })
  password: string;

  @Column({ length: 32, comment: '姓名' })
  name: string;

  @Column({ length: 18, unique: true, comment: '身份证号码或用户唯一标识' })
  idCard: string;

  @Column({ length: 11, nullable: true, comment: '手机号码' })
  phone: string;

  @Column({ length: 64, nullable: true, comment: '电子邮箱' })
  email: string;

  @Column({
    length: 32,
    nullable: true,
    default: 'system',
    comment: '用户来源',
  })
  source: string;

  @ManyToMany(() => Role, (role) => role)
  @JoinTable({
    name: 'r_user_role',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'roleId' },
  })
  roles: Role[];
}
