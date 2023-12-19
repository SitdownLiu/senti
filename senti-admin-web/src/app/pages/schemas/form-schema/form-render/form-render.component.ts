import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import microApp from '@micro-zoe/micro-app';
import { environment } from './../../../../../environments/environment';
import { FormSchemaService } from '../form-schema.service';
import { isEmpty } from 'class-validator';
import { ToolService } from './../../../../@core/services/tool.service';
import { DialogService, Message } from 'ng-devui';
import { JsonViewerComponent } from 'src/app/@shared/components/json-viewer/json-viewer.component';
import { JsonEditorComponent } from 'src/app/@shared/components/json-editor/json-editor.component';

@Component({
  selector: 'app-form-render',
  templateUrl: './form-render.component.html',
  styleUrls: ['./form-render.component.scss'],
})
export class FormRenderComponent implements OnInit, OnDestroy {
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
  enginePath = '';
  formData: any = {};

  constructor(
    private formSchemaService: FormSchemaService,
    private toolService: ToolService,
    private dialogService: DialogService
  ) {}

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
      this.formSchemaDetail = res;
      const { type, appType, formEngineType, formUrl, jsonSchema } = res;

      // 表单引擎
      if (type === 'FormEngine') {
        if (isEmpty(formEngineType) || isEmpty(jsonSchema)) {
          return this.toolService.openModal({
            type: 'warning',
            title: '配置错误',
            content: '请先完成[表单引擎类型]、[表单设计]的配置。',
          });
        }

        const [engineUrl, engineName] = formEngineType.split('-');
        this.engineUrl = this.sentiAppUrl[appType];
        this.engineName = engineName;
        this.enginePath = 'formRender';
      }

      // 用户自定义
      if (type === 'FormUrl') {
        if (isEmpty(formUrl)) {
          return this.toolService.openModal({
            type: 'warning',
            title: '配置错误',
            content: '请先完成[表单URL]的配置。',
          });
        }

        this.engineUrl = this.sentiAppUrl[appType];
        this.enginePath = formUrl;
      }

      // 加载子应用
      this.loadSentiApp(this.sentiApp, this.engineUrl, this.enginePath);
    });
  }

  // 加载子应用
  loadSentiApp(sentiApp, url, path) {
    sentiApp.setAttribute('url', url);
    sentiApp.setAttribute('default-page', path);
    microApp.reload('senti-app');
  }

  // 监听：senti-app的消息
  onSentiaAppData(data) {
    console.log('senti-app:', data);
    const { type, name } = data;
    // 处理事件：event
    if (type === 'event') {
      if (name === 'mounted') this.sentiAppMounted(data);
    }

    // 处理消息:message
    if (type === 'message') {
      if (name === 'formData') this.onSentiAppFormData(data);
    }

    // senti-app完成卸载时
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

  // 监听：senti-app发送的formData
  onSentiAppFormData(data) {
    this.loadingType = false;
    const { value } = data;
    this.openJsonViewer(value);
  }

  // 提交数据
  submit() {
    this.loadingType = true;
    microApp.forceSetData('senti-app', { type: 'event', name: 'submit' });
  }

  // 加载测试数据
  setTestData() {
    const formDataSchemaDialog = this.dialogService.open({
      dialogtype: 'info',
      showAnimation: true,
      title: '测试数据（Test Data）',
      maxHeight: '600px',
      width: '600px',
      zIndex: 1000,
      backdropCloseable: true,
      content: JsonEditorComponent,
      data: {
        content: this.formSchemaDetail.dataSchema,
        config: {
          lineNumbers: true,
          theme: 'material',
          mode: 'application/json',
        },
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '保存',
          disabled: false,
          handler: ($event: Event) => {
            try {
              const data = JSON.parse(formDataSchemaDialog.modalContentInstance.handlerContent);
              microApp.forceSetData('senti-app', {
                type: 'message',
                name: 'formData',
                value: { formId: this.formId, formData: data },
              });
              formDataSchemaDialog.modalInstance.hide();
            } catch (error) {
              this.toolService.openModal({
                type: 'failed',
                title: '类型错误',
                content: '不是有效的JSON格式。',
              });
            }
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '关闭',
          handler: ($event: Event) => {
            formDataSchemaDialog.modalInstance.hide();
          },
        },
      ],
    });
  }

  // 打开Json浏览器
  openJsonViewer(value) {
    const jsonViewerDialog = this.dialogService.open({
      dialogtype: 'info',
      showAnimation: true,
      title: '表单数据（Form Data）',
      width: '600px',
      maxHeight: '800px',
      zIndex: 1000,
      backdropCloseable: true,
      content: JsonViewerComponent,
      data: {
        formData: value,
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
            jsonViewerDialog.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '关闭',
          handler: ($event: Event) => {
            jsonViewerDialog.modalInstance.hide();
          },
        },
      ],
    });
  }
}
