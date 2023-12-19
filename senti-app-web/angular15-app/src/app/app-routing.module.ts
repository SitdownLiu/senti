import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDesignComponent } from './pages/form-design/form-design.component';

const routes: Routes = [
  {
    path: 'formDesigner',
    component: FormDesignComponent,
  },
  {
    path: 'formCustom',
    loadChildren: () => import('./pages/form-custom/form-custom.module').then((m) => m.FormCustomModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
