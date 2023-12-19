import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCustomComponent } from './form-custom.component';
import { FormCustomRoutingModule } from './form-custom-routing.module';
import { TestFormModule } from './test-form/test-form.module';

@NgModule({
  declarations: [FormCustomComponent],
  imports: [CommonModule, FormCustomRoutingModule, TestFormModule],
})
export class FormCustomModule {}
