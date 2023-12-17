import { Component, Input, OnInit } from '@angular/core';
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
export class FormDesignerComponent implements OnInit {
  @Input() formId: String;
  @Input() close: Function;

  loadingType: boolean = true;

  sentiApp = null;

  private readonly angular15AppUrl = environment.angular15AppUrl;
  private readonly vue3AppUrl = environment.vue3AppUrl;
  private readonly react18AppUrl = environment.react18AppUrl;

  formEngine = {
    angular15: this.angular15AppUrl,
    react18: this.react18AppUrl,
    vue3: this.vue3AppUrl,
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

  // 查询表单详情
  queryFormSchemaDetail() {
    this.formSchemaService.queryDetail(this.formId).then((res) => {
      const { formEngineType } = res;
      if (isEmpty(formEngineType)) {
        this.toolService.openModal({
          type: 'warning',
          title: '基本配置错误',
          content: '请先设置表单引擎类型',
        });
      } else {
        const [engineUrl, engineName] = formEngineType.split('-');

        this.formSchemaDetail = res;
        this.engineUrl = this.formEngine[engineUrl];
        this.engineName = engineName;
        // 加载子应用
        this.loadSentiApp(this.sentiApp, this.engineUrl);
      }
    });
  }

  // 监听：senti-app的消息
  onSentiaAppData(data) {
    console.log('来自senti-app的消息：', data);
    const { type } = data;
    // 处理事件：event
    if (type === 'event') {
      const { name } = data;
      if (name === 'mounted') this.sentiAppMounted(data);
    }

    // 处理消息:message
    if (type === 'message') {
      const { name } = data;
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
      name: 'formSchemaDetail',
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
          title: '操作成功',
          content: `表单[${this.formId}]的设计模型数据保存成功`,
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
