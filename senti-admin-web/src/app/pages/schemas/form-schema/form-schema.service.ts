import { Injectable } from '@angular/core';
import { HttpService } from './../../../@core/services/http.service';

export interface ListPager {
  pageSize: number;
  pageIndex: number;
  name?: string;
  type?: 'FormEngine' | 'FormUrl';
  formEngineType?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormSchemaService {
  constructor(private httpService: HttpService) {}

  private formTypeOptions: any[] = [
    { name: '表单引擎', value: 'FormEngine' },
    { name: '用户自定义', value: 'FormUrl' },
  ];

  private appTypeOptions: String[] = ['vue3', 'react18', 'angular15'];

  private formEngineTypeOptions: String[] = ['vue3-vform3', 'vue3-formcreate'];

  // 加载表单类型
  loadFormTypeOptions() {
    return this.formTypeOptions;
  }

  // 加载应用类型
  loadAppTypeOptions() {
    return this.appTypeOptions;
  }

  // 加载表单引擎类型
  loadFormEngineTypeOptions() {
    return this.formEngineTypeOptions;
  }

  // 查询列表
  getList(pager: ListPager) {
    return this.httpService.get('/schemas/formSchema/page', pager);
  }

  // 保存一条新增的表单数据
  save(data) {
    return this.httpService.post('/schemas/formSchema', data);
  }

  // 修改列表数据
  patchList(id, data) {
    return this.httpService.patch('/schemas/formSchema/list', id, data);
  }

  // 删除列表数据
  deleteList(id) {
    return this.httpService.delete('/schemas/formSchema', id);
  }

  // 查询详情
  queryDetail(id) {
    return this.httpService.get(`/schemas/formSchema/query/${id}`);
  }

  // 修改表单配置
  patchConfig(id, data) {
    return this.httpService.patch('/schemas/formSchema/config', id, data);
  }
}
