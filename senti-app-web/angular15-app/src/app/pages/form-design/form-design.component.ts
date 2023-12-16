import { Component, OnInit } from '@angular/core';
import microApp from '@micro-zoe/micro-app';
import { HttpService } from './../../@core/services/http.service';

@Component({
  selector: 'app-form-design',
  templateUrl: './form-design.component.html',
  styleUrls: ['./form-design.component.scss'],
})
export class FormDesignComponent implements OnInit {
  formData = {};
  formId = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    // microApp.addDataListener('vue3-app', (data: any) => {
    //   console.log('senti-app收到vue3-app :', data);
    //   microApp.setData('vue3-app', { type: '发给vue3' });
    // });
    // 通知主应用：渲染完成
    window.microApp.dispatch({ type: 'event', name: 'mounted' });
    // 监听：主应用的消息
    window.microApp.addDataListener((data: any) => this.onMainAppData(data));
  }

  // 监听：主应用的消息
  onMainAppData(data: any) {
    console.log(data);
    const { type } = data;
    // 处理事件：event
    if (type === 'event') {
    }

    // 处理消息:message
    if (type === 'message') {
      const { name, value } = data;
      // 获取表单详情
      if (name === 'formId') {
        this.formId = value;
        this.queryFormSchemaDetail()
      }
    }
  }

  // 查询表单详情
  queryFormSchemaDetail() {
    this.httpService.get(`/schemas/formSchema/query/${this.formId}`).then((res) => {
      console.log(res);
    });
  }
}
