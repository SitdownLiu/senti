import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuardService } from './@core/services/auth-guard-service.guard';
import { LoginComponent } from './@shared/components/login/login.component';
import { RegisterComponent } from './@shared/components/register/register.component';
import { ServerErrorComponent } from './@shared/components/abnormal/server-error/server-error.component';
import { ForbiddenComponent } from './@shared/components/abnormal/forbidden/forbidden.component';
import { NotFoundComponent } from './@shared/components/abnormal/not-found/not-found.component';
import { FormSchemaComponent } from './pages/schemas/form-schema/form-schema.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pages/schemas/form-schema',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'form-schema',
    component: FormSchemaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
