import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormSchema } from './entities/form-schema.entity';
import { Like, Repository } from 'typeorm';
import { ListSchema } from './entities/list-schema.entity';

@Injectable()
export class SchemasService {
  constructor(
    @InjectRepository(FormSchema)
    private readonly formSchema: Repository<FormSchema>,

    @InjectRepository(ListSchema)
    private readonly listSchema: Repository<ListSchema>,
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
      .createQueryBuilder('form')
      .select([
        'form.id',
        'form.name',
        'form.type',
        'form.appType',
        'form.formEngineType',
        'form.formUrl',
        'form.remark',
        'form.create_at',
        'form.update_at',
      ])
      .orderBy('create_at', 'DESC');

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
      return this.formSchema.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

  // 删除
  async deleteFormSchema(id): Promise<any> {
    try {
      let ret = await this.formSchema.findOne({ where: { id } });
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
      let ret = await this.formSchema.findOne({ where: { id } });
      ret = await Object.assign(ret, dto);
      this.formSchema.save(ret);
      return id;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

  /**
   ** @动态列表模型
   **************************************************************/
  // 保存动态列表模型（添加或修改）
  async saveListSchema(dto): Promise<any> {
    const { id } = dto;
    try {
      // 新增
      if (!id) return this.listSchema.save(dto);
      // 修改
      const ret = await this.listSchema.update(id, dto);
      const { affected } = ret;
      if (affected > 0) return id;
      throw new NotFoundException(`不存在的id: ${id}`);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // 分页查询动态列表模型
  async pageListSchema(query): Promise<any> {
    const { pageNum, pageSize, name, type } = query;
    const take = pageSize || 10,
      skip = (pageNum - 1) * take || 0;

    const qb = this.listSchema
      .createQueryBuilder('list')
      .select([
        'list.id',
        'list.name',
        'list.type',
        'list.listUrl',
        'list.ormappingId',
        'list.create_at',
        'list.update_at',
      ])
      .orderBy('create_at', 'DESC');

    if (name) qb.where({ name: Like(`%${name}%`) });
    if (type) qb.andWhere({ type });
    if (pageNum || pageSize) {
      await qb.skip(skip).take(take);
      const [list, total] = await qb.getManyAndCount();

      return { list, total };
    }

    return qb.getMany();
  }

  // 查询动态列表模型详情
  async queryListSchema(id): Promise<any> {
    try {
      return this.listSchema.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

  // 删除
  async deleteListSchema(id): Promise<any> {
    try {
      let ret = await this.listSchema.findOne({ where: { id } });
      ret.deleteAt = new Date();
      this.listSchema.save(ret);

      return id;
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

  // 修改局部数据
  async patchListSchema(id, dto): Promise<any> {
    try {
      let ret = await this.listSchema.findOne({ where: { id } });
      ret = await Object.assign(ret, dto);
      this.listSchema.save(ret);
      return id;
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }
}
