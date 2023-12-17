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

@ApiTags('模型管理')
@ApiHeader({ name: 'token', description: 'accessToken' })
@Controller('schemas')
export class SchemasController {
  constructor(private readonly schemasService: SchemasService) {}

  /**
   ** @表单模型
   **************************************************************/
  @ApiOperation({ summary: '保存表单模型（添加或删除）' })
  @Roles('admin')
  @Post('/formSchema')
  saveFormSchema(@Body() body: FormSchemaInfoDto) {
    return this.schemasService.saveFormSchema(body);
  }

  @ApiOperation({ summary: '分页查询表单模型列表' })
  @ApiResponse({ status: 200, type: PageFormSchemaRes })
  @Roles('admin')
  @Get('/formSchema/page')
  pageFormSchema(@Query() query: PageFormSchemaDto) {
    return this.schemasService.pageFormSchema(query);
  }

  @ApiOperation({ summary: '查询表单模型详情' })
  @ApiResponse({ status: 200, type: FormSchemaInfoDto })
  @Roles('admin')
  @Get('/formSchema/query/:id')
  queryFormSchema(@Param() param: FormSchemaIdDto) {
    return this.schemasService.queryFormSchema(param.id);
  }

  @ApiOperation({ summary: '删除表单模型' })
  @Roles('admin')
  @Delete('/formSchema/:id')
  delteFormSchema(@Param() param: FormSchemaIdDto) {
    return this.schemasService.deleteFormSchema(param.id);
  }
  @ApiOperation({ summary: '修改表单模型列表数据' })
  @Roles('admin')
  @Patch('/formSchema/list/:id')
  patchFormSchemaList(@Param() param: FormSchemaIdDto, @Body() body: PatchFormSchemaListDto) {
    return this.schemasService.patchFormSchema(param.id, body);
  }

  @ApiOperation({ summary: '修改表单模型配置' })
  @Roles('admin')
  @Patch('/formSchema/config/:id')
  patchFormSchemaConfig(@Param() param: FormSchemaIdDto, @Body() body: PatchFormSchemaConfigDto) {
    return this.schemasService.patchFormSchema(param.id, body);
  }
}
