import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorComponent } from './json-editor.component';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ButtonModule, CardModule, LoadingModule } from 'ng-devui';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [JsonEditorComponent],
  imports: [CommonModule, FormsModule, CodemirrorModule, CardModule, ButtonModule, LoadingModule],
  exports: [JsonEditorComponent],
})
export class JsonEditorModule {}
