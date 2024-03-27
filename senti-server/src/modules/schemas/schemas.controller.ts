import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SchemasService } from './schemas.service';
import {
  FormSchemaIdDto,
  FormSchemaInfoDto,
  PageFormSchemaDto,
  PageFormSchemaRes,
  PatchFormSchemaConfigDto,
  PatchFormSchemaListDto,
} from './dtos/form-schema.dto';
import { Roles } from 'src/common/common.decorator';
import {
  ListSchemaIdDto,
  ListSchemaInfoDto,
  PageListSchemaDto,
  PageListSchemaRes,
  PatchListSchemaConfigDto,
  PatchListSchemaListDto,
} from './dtos/list-schema.dto';

@ApiTags('模型管理')
@ApiHeader({ name: 'sentitoken', description: 'accessToken' })
@Controller('schemas')
export class SchemasController {
  constructor(private readonly schemasService: SchemasService) {}

  /**
   ** @表单模型
   **************************************************************/
  @ApiOperation({ summary: '保存表单模型（添加或删除）' })
  @Roles('admin', 'admin-app')
  @Post('/formSchema')
  saveFormSchema(@Body() body: FormSchemaInfoDto) {
    return this.schemasService.saveFormSchema(body);
  }

  @ApiOperation({ summary: '分页查询表单模型列表' })
  @ApiResponse({ status: 200, type: PageFormSchemaRes })
  @Roles('admin', 'admin-app')
  @Get('/formSchema/page')
  pageFormSchema(@Query() query: PageFormSchemaDto) {
    return this.schemasService.pageFormSchema(query);
  }

  @ApiOperation({ summary: '查询表单模型详情' })
  @ApiResponse({ status: 200, type: FormSchemaInfoDto })
  @Roles('admin', 'admin-app', 'user-app')
  @Get('/formSchema/query/:id')
  queryFormSchema(@Param() param: FormSchemaIdDto) {
    return this.schemasService.queryFormSchema(param.id);
  }

  @ApiOperation({ summary: '删除表单模型' })
  @Roles('admin', 'admin-app')
  @Delete('/formSchema/:id')
  deleteFormSchema(@Param() param: FormSchemaIdDto) {
    return this.schemasService.deleteFormSchema(param.id);
  }

  @ApiOperation({ summary: '修改表单模型列表数据' })
  @Roles('admin', 'admin-app')
  @Patch('/formSchema/list/:id')
  patchFormSchemaList(@Param() param: FormSchemaIdDto, @Body() body: PatchFormSchemaListDto) {
    return this.schemasService.patchFormSchema(param.id, body);
  }

  @ApiOperation({ summary: '修改表单模型配置' })
  @Roles('admin', 'admin-app')
  @Patch('/formSchema/config/:id')
  patchFormSchemaConfig(@Param() param: FormSchemaIdDto, @Body() body: PatchFormSchemaConfigDto) {
    return this.schemasService.patchFormSchema(param.id, body);
  }

  @ApiOperation({ summary: '创建副本-表单模型' })
  @Roles('admin', 'admin-app')
  @Post('/formSchema/copy')
  copyFormSchema(@Body() body: FormSchemaIdDto) {
    return this.schemasService.copyFormSchema(body.id);
  }

  /**
   ** @动态列表模型
   **************************************************************/
  @ApiOperation({ summary: '保存动态列表模型（添加或删除）' })
  @Roles('admin', 'admin-app')
  @Post('/listSchema')
  saveListSchema(@Body() body: ListSchemaInfoDto) {
    return this.schemasService.saveListSchema(body);
  }

  @ApiOperation({ summary: '分页查询动态列表模型' })
  @ApiResponse({ status: 200, type: PageListSchemaRes })
  @Roles('admin', 'admin-app')
  @Get('/listSchema/page')
  pageListSchema(@Query() query: PageListSchemaDto) {
    return this.schemasService.pageListSchema(query);
  }

  @ApiOperation({ summary: '查询动态列表模型详情' })
  @ApiResponse({ status: 200, type: ListSchemaInfoDto })
  @Roles('admin', 'admin-app', 'user-app')
  @Get('/listSchema/query/:id')
  queryListSchema(@Param() param: ListSchemaIdDto) {
    return this.schemasService.queryListSchema(param.id);
  }

  @ApiOperation({ summary: '删除动态列表模型' })
  @Roles('admin', 'admin-app')
  @Delete('/listSchema/:id')
  deleteListSchema(@Param() param: ListSchemaIdDto) {
    return this.schemasService.deleteListSchema(param.id);
  }

  @ApiOperation({ summary: '修改动态列表模型-分页列表' })
  @Roles('admin', 'admin-app')
  @Patch('/listSchema/list/:id')
  patchListSchemaList(@Param() param: ListSchemaIdDto, @Body() body: PatchListSchemaListDto) {
    return this.schemasService.patchListSchema(param.id, body);
  }

  @ApiOperation({ summary: '修改动态列表模型配置-详细配置' })
  @Roles('admin', 'admin-app')
  @Patch('/listSchema/config/:id')
  patchListSchemaConfig(@Param() param: ListSchemaIdDto, @Body() body: PatchListSchemaConfigDto) {
    return this.schemasService.patchListSchema(param.id, body);
  }

  @ApiOperation({ summary: '创建副本-动态列表模型' })
  @Roles('admin', 'admin-app')
  @Post('/listSchema/copy')
  copyListSchema(@Body() body: ListSchemaIdDto) {
    return this.schemasService.copyListSchema(body.id);
  }
}
