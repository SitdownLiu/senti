import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  AvatarModule,
  CardModule,
  DataTableModule,
  DatepickerModule,
  LoadingModule,
  PaginationModule,
  SelectModule,
  TagsModule,
} from 'ng-devui';
import { ListDataService } from './list-data.service';
import { SharedModule } from 'src/app/@shared/shared.module';
import { FormSchemaComponent } from './form-schema.component';
import { AdminFormModule } from 'src/app/@shared/components/admin-form';
import { FormSchemaService } from './form-schema.service';
import { FormSchemaPipe } from './form-schema.pipe';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { FormDesignerModule } from './form-designer/form-designer.module';
import { FormRenderModule } from './form-render/form-render.module';
import { CommonModule } from '@angular/common';
import { JsonEditorModule } from 'src/app/@shared/components/json-editor/json-editor.module';

@NgModule({
  declarations: [FormSchemaComponent, FormSchemaPipe],
  imports: [
    CommonModule,
    SharedModule,
    DataTableModule,
    AdminFormModule,
    TagsModule,
    LoadingModule,
    CardModule,
    AvatarModule,
    PaginationModule,
    SelectModule,
    DatepickerModule,
    FormDesignerModule,
    FormRenderModule,
    JsonEditorModule,
  ],
  exports: [FormSchemaComponent],
  providers: [ListDataService, FormSchemaService],
})
export class FormSchemaModule {}
