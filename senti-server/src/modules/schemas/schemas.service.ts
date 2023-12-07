import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormSchema } from './entities/form-schema.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SchemasService {
  constructor(
    @InjectRepository(FormSchema)
    private readonly formSchema: Repository<FormSchema>,
  ) {}

  /**
   ** @表单模型
   **************************************************************/
  // 保存表单模型（添加或修改）
  async saveFormSchema(dto): Promise<any> {
    const { id } = dto;
    try {
      // 新增
      if (!id) return this.formSchema.save(dto);
      // 修改
      const ret = await this.formSchema.update(id, dto);
      const { affected } = ret;
      if (affected > 0) return id;
      throw new NotFoundException(`不存在的id: ${id}`);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // 分页查询表单模型
  async pageFormSchema(query): Promise<any> {
    const { pageNum, pageSize, name, type, formEngineType } = query;
    const take = pageSize || 10,
      skip = (pageNum - 1) * take || 0;

    const qb = this.formSchema
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.type',
        'user.formEngineType',
        'user.formUrl',
        'user.remark',
        'user.create_at',
        'user.update_at',
      ])
      .orderBy('update_at', 'DESC');

    if (name) qb.where({ name: Like(`%${name}%`) });
    if (type) qb.andWhere({ type });
    if (formEngineType) qb.andWhere({ formEngineType });
    if (pageNum || pageSize) {
      await qb.skip(skip).take(take);
      const [list, total] = await qb.getManyAndCount();

      return { list, total };
    }

    return qb.getMany();
  }

  // 查询表单模型详情
  async queryFormSchema(id): Promise<any> {
    try {
      return this.formSchema.findOne(id);
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

  // 删除
  async deleteFormSchema(id): Promise<any> {
    try {
      let ret = await this.formSchema.findOne(id);
      ret.deleteAt = new Date();
      this.formSchema.save(ret);

      return id;
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

  // 修改局部数据
  async patchFormSchema(id, dto): Promise<any> {
    try {
      let ret = await this.formSchema.findOne(id);
      ret = Object.assign(ret, dto);
      this.formSchema.save(ret);
      return id;
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }
}
