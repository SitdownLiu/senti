import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemasComponent } from './schemas.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { SchemasRoutingModule } from './schemas-routing.module';
import { FormSchemaModule } from './form-schema/form-schema.module';

@NgModule({
  declarations: [SchemasComponent],
  imports: [CommonModule, SharedModule, SchemasRoutingModule, FormSchemaModule],
})
export class SchemasModule {}
