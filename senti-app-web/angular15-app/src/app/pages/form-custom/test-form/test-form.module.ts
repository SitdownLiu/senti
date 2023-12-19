import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestFormComponent } from './test-form.component';
import { FormsModule } from '@angular/forms';
import { DevUIModule, FormModule } from 'ng-devui';

@NgModule({
  declarations: [TestFormComponent],
  imports: [CommonModule, FormsModule, FormModule, DevUIModule],
  exports: [TestFormComponent],
})
export class TestFormModule {}
