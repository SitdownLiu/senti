import { Component, Input, OnInit } from '@angular/core';
import microApp from '@micro-zoe/micro-app';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.scss'],
})
export class FormDesignerComponent implements OnInit {
  @Input() formId: String;
  @Input() close: Function;

  private readonly sentiAppUrl = environment.sentiAppUrl;

  constructor() {}

  ngOnInit(): void {
    const sentiApp = document.querySelector('micro-app[name=senti-app]');

    // 加载senti-app
    this.loadSentiApp(sentiApp);

    // 监听：senti-app的消息
    microApp.addDataListener('senti-app', (data) => this.onSentiaAppData(data));
  }

  // 监听：senti-app的消息
  onSentiaAppData(data) {
    console.log('来自senti-app的消息：', data);
    const { type } = data;
    // 处理事件：event
    if (type === 'event') {
      // senti-app完成渲染时
      this.sentiAppMounted(data);
    }

    // 处理消息:message
    if (type === 'message') {
    }

    // senti-app完成卸载时
  }

  // 加载senti-app
  loadSentiApp(sentiApp) {
    sentiApp.setAttribute('url', this.sentiAppUrl);
    microApp.reload('senti-app');
  }

  // 监听：senti-app完成渲染时
  sentiAppMounted(data: any) {
    console.log(data);
    // 发送formId
    microApp.setData('senti-app', { type: 'message', name: 'formId', value: this.formId });
  }

  // 监听：senti-app完成卸载时
  sentiAppUnmount(event) {}

  // 保存
  save(size) {
    console.log(size);
  }
}
