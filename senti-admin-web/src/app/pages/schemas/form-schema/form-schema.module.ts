import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [FormSchemaComponent],
  imports: [
    SharedModule,
    DataTableModule,
    AdminFormModule,
    TagsModule,
    LoadingModule,
    CardModule,
    AvatarModule,
    PaginationModule,
    SelectModule,
    DatepickerModule
  ],
  exports: [FormSchemaComponent],
  providers: [ListDataService],
})
export class FormSchemaModule {}
