import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/common/common.decorator';
import { BaseService } from './base.service';
import {
  AddOrUpdateDictionaryTypeDto,
  DeleteDictionaryTypeDto,
  QueryDictionaryTypeDto,
  ResDicTypeDto,
} from './dtos/dictionary-type.dto';
import {
  AddOrUpdateDictionaryDto,
  QueryDictionaryDto,
  DeleteDictionaryDto,
  ResDicDto,
} from './dtos/dictionary.dto';
import { AddOrUpdateRoleDto, DeleteRoleDto, ResRoleDto } from './dtos/role.dto';

@ApiTags('基础服务')
@ApiHeader({ name: 'token', description: 'accessToken' })
@Controller('base')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  /**
   ** @字典类型
   **************************************************************/
  @ApiOperation({ summary: '添加或修改字典类型' })
  @Roles('admin')
  @Post('/dictionaryType')
  addOrUpdateDictionaryType(@Body() body: AddOrUpdateDictionaryTypeDto) {
    return this.baseService.addOrUpdateDictionaryType(body);
  }

  @ApiOperation({ summary: '查询字典类型' })
  @ApiResponse({ status: 200, type: ResDicTypeDto })
  @Get('/dictionaryType')
  async queryDictionaryType(@Query() query: QueryDictionaryTypeDto) {
    return this.baseService.queryDictionaryType(query);
  }

  @ApiOperation({ summary: '删除字典类型' })
  @Roles('admin')
  @Delete('/dictionaryType/:id')
  async deleteDictionaryType(@Param() params: DeleteDictionaryTypeDto) {
    return this.baseService.deleteDictionaryType(params.id);
  }

  /**
   ** @字典
   **************************************************************/
  @ApiOperation({ summary: '添加或修改字典' })
  @Roles('admin')
  @Post('/dictionary')
  addOrUpdateDictionary(@Body() body: AddOrUpdateDictionaryDto) {
    return this.baseService.addOrUpdateDictionary(body);
  }

  @ApiOperation({ summary: '查询字典' })
  @ApiResponse({ status: 200, type: ResDicDto })
  @Get('/dictionary')
  async queryDictionary(@Query() query: QueryDictionaryDto) {
    return this.baseService.queryDictionary(query);
  }

  @ApiOperation({ summary: '删除字典' })
  @Roles('admin')
  @Delete('/dictionary/:id')
  async deleteDictionary(@Param() params: DeleteDictionaryDto) {
    return this.baseService.deleteDictionary(params.id);
  }

  /**
   ** @角色
   **************************************************************/
  @ApiOperation({ summary: '添加或修改角色' })
  @Roles('admin')
  @Post('/role')
  addOrUpdateRole(@Body() body: AddOrUpdateRoleDto) {
    return this.baseService.addOrUpdateRole(body);
  }

  @ApiOperation({ summary: '查询角色' })
  @ApiResponse({ status: 200, type: ResRoleDto })
  @Get('/role')
  queryRole() {
    return this.baseService.queryRole();
  }

  @ApiOperation({ summary: '删除角色' })
  @Roles('admin')
  @Get('/role/:id')
  deleteRole(@Param() params: DeleteRoleDto) {
    return this.baseService.deleteRole(params.id);
  }
}
