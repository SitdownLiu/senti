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

  private formTypeOptions = [
    { name: '表单引擎', value: 'FormEngine' },
    { name: '用户自定义', value: 'FormUrl' },
  ];

  // 加载表单类型
  loadFormTypeOptions() {
    return this.formTypeOptions;
  }

  // 查询列表
  getList(pager: ListPager) {
    return this.httpService.get('/schemas/formSchema/page', pager);
  }

  // 保存一条新增的表单数据
  save(data) {
    return this.httpService.post('/schemas/formSchema', data);
  }
}
