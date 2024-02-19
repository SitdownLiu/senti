import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isEmpty } from 'class-validator';
import { FormSchemaService } from 'src/app/pages/schemas/form-schema/form-schema.service';
import { ToolService } from './../../../@core/services/tool.service';
import { LoadingType } from 'ng-devui';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
})
export class JsonEditorComponent implements OnInit {
  @Input() formId: String;
  @Input() close: Function;
  @Output() change = new EventEmitter<string>();

  busy: LoadingType;

  public content = '';
  public config = {
    lineNumbers: true,
    theme: 'duotone-light',
    mode: 'application/json',
  };

  constructor(private formSchemaService: FormSchemaService, private toolService: ToolService) {}

  ngOnInit(): void {
    this.busy = this.formSchemaService.queryDetail(this.formId).then((res) => {
      const { dataSchema } = res;
      this.content = isEmpty(dataSchema) ? '{}' : dataSchema;
    });
  }

  // 获取编辑内容
  public handlerContent: string = '';
  codeChange(content) {
    this.handlerContent = content;
  }

  // 提交
  onSubmit() {
    try {
      const dataSchema = JSON.parse(this.handlerContent);
      this.busy = this.formSchemaService
        .patchConfig(this.formId, {
          dataSchema: this.handlerContent,
        })
        .then((res) => {
          this.toolService.openModal({
            type: 'success',
            title: '操作成功',
            content: `ID[${this.formId}]的表单数据模型配置已保存。`,
          });
          this.close();
        })
        .finally(() => {});
    } catch (error) {
      this.toolService.openModal({
        type: 'failed',
        title: '类型错误',
        content: '不是有效的JSON格式。',
      });
    }
  }
}
