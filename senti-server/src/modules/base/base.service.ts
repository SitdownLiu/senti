import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DictionaryType } from './entities/dictionary-type.entity';
import { Role } from './entities/role.entity';
import { Dictionary } from './entities/dictionary.entity';
import { pageQueryBuilder } from './../../common/common.tools';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(DictionaryType)
    private readonly dictionaryType: Repository<DictionaryType>,

    @InjectRepository(Dictionary)
    private readonly dictionary: Repository<Dictionary>,

    @InjectRepository(Role)
    private readonly role: Repository<Role>,
  ) {}

  /**
   ** @字典类型
   **************************************************************/
  //添加或修改
  async addOrUpdateDictionaryType(dto): Promise<any> {
    const { id } = dto;

    try {
      if (!id) return await this.dictionaryType.save(dto);

      const ret = await this.dictionaryType.update(id, dto);
      const { affected } = ret;
      if (affected > 0) return id;
      throw new NotFoundException(`不存在的id: ${id}`);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  //查询
  async queryDictionaryType(query): Promise<any> {
    const { pageNum, pageSize, name } = query;
    const take = pageSize || 10,
      skip = (pageNum - 1) * take || 0;

    const qb = this.dictionaryType
      .createQueryBuilder()
      .orderBy('update_at', 'DESC');

    if (name) qb.where({ name: Like(`%${name}%`) });
    if (pageNum || pageSize) {
      await qb.skip(skip).take(take);
      const [list, total] = await qb.getManyAndCount();
      return { list, total };
    }

    return qb.getMany();
  }

  //删除
  async deleteDictionaryType(id): Promise<any> {
    try {
      let ret = await this.dictionaryType.findOne(id);
      ret.deleteAt = await new Date();
      await this.dictionaryType.save(ret);

      return id;
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

  /**
   ** @字典
   **************************************************************/
  //添加或修改
  async addOrUpdateDictionary(dto): Promise<any> {
    const { id, dictionaryTypeId } = dto;

    try {
      const type = await this.dictionaryType.findOne(dictionaryTypeId);

      if (type) {
        const dic = await this.dictionary.save(dto);
        dic.dictionaryType = type;
        await this.dictionary.save(dic);
        return null;
      }
      throw new NotFoundException(`不存在的类型id: ${dictionaryTypeId}`);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  //查询
  async queryDictionary(query): Promise<any> {
    const { pageNum, pageSize, typeId, typeCode } = query;
    const qb = await this.dictionaryType
      .createQueryBuilder('type')
      .orderBy('type.update_at', 'DESC')
      .leftJoinAndSelect(Dictionary, 'dic', 'dic.dictionaryTypeId = type.id')
      .select([
        `type.id as typeId`,
        `type.name as typeName`,
        `type.code as typeCode`,
        `dic.id as dicId`,
        `dic.name as dicName`,
        `dic.code as dicCode`,
      ])
      .where(`type.code = :code`, { code: typeCode });

    if (typeId) await qb.andWhere({ id: typeId });

    return await qb.getRawMany();
  }

  //删除
  async deleteDictionary(id): Promise<any> {
    try {
      let ret = await this.dictionary.findOne(id);
      ret.deleteAt = await new Date();
      await this.dictionary.save(ret);

      return id;
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

  /**
   ** @角色
   **************************************************************/
  //添加或修改
  async addOrUpdateRole(dto): Promise<any> {
    const { id } = dto;

    try {
      if (!id) return await this.role.save(dto);

      let role = await this.role.findOne(id);
      role = { ...role, ...dto };
      return await this.role.save(role);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  //查询
  async queryRole(): Promise<any> {
    return await this.role.find();
  }

  //删除
  async deleteRole(id): Promise<any> {
    try {
      let ret = await this.role.findOne(id);
      ret.deleteAt = await new Date();
      await this.role.save(ret);

      return id;
    } catch (error) {
      throw new NotFoundException(`不存在的id: ${id}`);
    }
  }

}
