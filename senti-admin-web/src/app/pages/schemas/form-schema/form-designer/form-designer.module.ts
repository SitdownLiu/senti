import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDesignerComponent } from './form-designer.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { SplitterModule } from 'ng-devui';
import { FormSchemaService } from '../form-schema.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FormDesignerComponent],
  imports: [CommonModule, SharedModule, SplitterModule],
  providers: [FormSchemaService],
})
export class FormDesignerModule {}
