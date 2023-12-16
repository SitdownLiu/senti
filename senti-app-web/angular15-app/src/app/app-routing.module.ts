import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDesignComponent } from './pages/form-design/form-design.component';

const routes: Routes = [
  {
    path: 'form-design',
    component: FormDesignComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
