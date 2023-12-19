import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormCustomComponent } from './form-custom.component';
import { TestFormComponent } from './test-form/test-form.component';

const routes: Routes = [
  {
    path: '',
    component: FormCustomComponent,
    children: [
      {
        path: 'testForm',
        component: TestFormComponent,
      },
      {
        path: '',
        redirectTo: 'getting-started',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'getting-started',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCustomRoutingModule {}
