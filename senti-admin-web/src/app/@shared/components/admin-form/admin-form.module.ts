import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFormComponent } from './admin-form.component';
import { ButtonModule, DatepickerModule, FormModule, SelectModule } from 'ng-devui';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, FormModule, DatepickerModule, FormsModule, SelectModule, ButtonModule],
  declarations: [AdminFormComponent],
  exports: [AdminFormComponent],
})
export class AdminFormModule {}
