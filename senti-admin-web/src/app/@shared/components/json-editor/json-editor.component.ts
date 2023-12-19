import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isEmpty } from 'class-validator';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
})
export class JsonEditorComponent implements OnInit {
  @Input() data: any;
  @Output() change = new EventEmitter<string>();

  public content = '';
  public config = {};

  ngOnInit(): void {
    const { content, config } = this.data;

    this.content = isEmpty(content) ? '{}' : content;
    this.config = isEmpty(config)
      ? {
          lineNumbers: true,
          theme: 'duotone-light',
          mode: 'application/json',
        }
      : config;
  }

  // 获取编辑内容
  public handlerContent: string = '';
  codeChange(content, data) {
    this.handlerContent = content;
  }
}
