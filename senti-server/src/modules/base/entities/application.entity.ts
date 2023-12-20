import { BaseColumnEntity } from 'src/common/baseColumn.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'a_application' })
export class Application extends BaseColumnEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '应用id' })
  id: string;

  @Column({ length: 64, comment: '应用密钥' })
  secretKey: string;

  @Column({ length: 32, comment: '应用名称' })
  name: string;

  @Column({ length: 256, nullable: true, comment: '应用说明' })
  remark: string;

  @ManyToMany(() => Role, (role) => role)
  @JoinTable({
    name: 'r_application_role',
    joinColumn: { name: 'appId' },
    inverseJoinColumn: { name: 'roleId' },
  })
  roles: Role[];
}
