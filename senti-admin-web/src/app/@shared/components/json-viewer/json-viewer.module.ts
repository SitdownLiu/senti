import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonViewerComponent } from './json-viewer.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [JsonViewerComponent],
  imports: [CommonModule, NgxJsonViewerModule],
  exports: [JsonViewerComponent],
})
export class JsonViewerModule {}
