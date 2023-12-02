import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseColumnEntity {
  @CreateDateColumn({
    type: 'datetime',
    name: 'create_at',
    comment: '创建日期',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_at',
    comment: '更新日期',
  })
  updateAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'delete_at',
    comment: '删除日期',
    select: false,
  })
  deleteAt: Date;
}
