import { RouterModule, Routes } from '@angular/router';
import { SchemasComponent } from './schemas.component';
import { NotFoundComponent } from 'src/app/@shared/components/abnormal/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { FormSchemaComponent } from './form-schema/form-schema.component';

const routes: Routes = [
  {
    path: '',
    component: SchemasComponent,
    children: [
      { path: 'form-schema', component: FormSchemaComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchemasRoutingModule {}
