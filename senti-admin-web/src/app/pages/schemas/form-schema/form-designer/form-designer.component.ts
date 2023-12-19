import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import microApp from '@micro-zoe/micro-app';
import { environment } from './../../../../../environments/environment';
import { FormSchemaService } from '../form-schema.service';
import { isEmpty } from 'class-validator';
import { ToolService } from './../../../../@core/services/tool.service';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.scss'],
})
export class FormDesignerComponent implements OnInit, OnDestroy {
  @Input() formId: String;
  @Input() close: Function;

  loadingType: boolean = true;

  // 子应用Dom
  sentiApp = null;

  // 子应用Url
  private readonly sentiAppUrl = {
    angular15: environment.angular15AppUrl,
    react18: environment.react18AppUrl,
    vue3: environment.vue3AppUrl,
  };

  formSchemaDetail: any = {};
  engineUrl = '';
  engineName = '';

  constructor(private formSchemaService: FormSchemaService, private toolService: ToolService) {}

  ngOnInit(): void {
    this.sentiApp = document.querySelector('micro-app[name=senti-app]');

    // 查询表单详情
    this.queryFormSchemaDetail();
    // 监听：senti-app的消息
    microApp.addDataListener('senti-app', (data) => this.onSentiaAppData(data));
  }

  ngOnDestroy(): void {
    // 清空所有监听指定子应用的函数
    microApp.clearDataListener('senti-app');
  }

  // 查询表单详情
  queryFormSchemaDetail() {
    this.formSchemaService.queryDetail(this.formId).then((res) => {
      const { appType, formEngineType } = res;
      if (isEmpty(formEngineType)) {
        this.toolService.openModal({
          type: 'warning',
          title: '基本配置错误',
          content: '请先设置表单引擎类型',
        });
      } else {
        const [engineUrl, engineName] = formEngineType.split('-');

        this.formSchemaDetail = res;
        this.engineUrl = this.sentiAppUrl[appType];
        this.engineName = engineName;
        // 加载子应用
        this.loadSentiApp(this.sentiApp, this.engineUrl);
      }
    });
  }

  // 监听：senti-app的消息
  onSentiaAppData(data) {
    console.log('来自senti-app的消息：', data);
    const { type, name } = data;
    // 处理事件：event
    if (type === 'event') {
      if (name === 'mounted') this.sentiAppMounted(data);
    }

    // 处理消息:message
    if (type === 'message') {
      if (name === 'formSchema') this.onSentiAppFormSchema(data);
    }

    // senti-app完成卸载时
  }

  // 加载子应用
  loadSentiApp(sentiApp, url) {
    sentiApp.setAttribute('url', url);
    microApp.reload('senti-app');
  }

  // 监听：senti-app完成渲染时
  sentiAppMounted(data: any) {
    console.log(data);
    this.loadingType = false;
    // 发送formId
    microApp.setData('senti-app', {
      type: 'message',
      name: 'formSchema',
      value: {
        engineName: this.engineName,
        schema: this.formSchemaDetail.jsonSchema,
      },
    });
  }

  // 监听：senti-app完成卸载时
  sentiAppUnmount(event) {}

  // 监听：senti-app 发送的formSchema
  onSentiAppFormSchema(data) {
    const { value } = data;
    // 保存表单配置
    this.formSchemaService
      .patchConfig(this.formId, { jsonSchema: value })
      .then((res) => {
        this.toolService.openModal({
          type: 'success',
          title: '保存成功',
          content: `ID[${this.formId}]的表单设计模型数据已保存。`,
        });
      })
      .finally(() => {
        this.loadingType = false;
      });
  }

  // 保存
  save() {
    this.loadingType = true;
    microApp.forceSetData('senti-app', { type: 'event', name: 'save' });
  }
}
