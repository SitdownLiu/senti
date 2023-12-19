import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRenderComponent } from './form-render.component';
import { FormSchemaService } from '../form-schema.service';
import { SharedModule } from 'src/app/@shared/shared.module';
import { SplitterModule } from 'ng-devui';
import { JsonViewerModule } from 'src/app/@shared/components/json-viewer/json-viewer.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FormRenderComponent],
  imports: [CommonModule, SharedModule, SplitterModule, JsonViewerModule],
  providers: [FormSchemaService],
})
export class FormRenderModule {}
