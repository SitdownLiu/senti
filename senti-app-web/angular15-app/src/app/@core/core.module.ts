import { HttpService } from './services/http.service';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthService } from './services/auth.service';
import { CustomThemeService } from './services/custom-theme.service';
import { CourseData } from './data/course';
import { CourseService } from './mock/course.service';
import { MockDataModule } from './mock/mock-data.module';
import { AuthGuardService } from './services/auth-guard-service.guard';

const DATA_SERVICES = [{ provide: CourseData, useClass: CourseService }];

export const DEVUI_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers!,
  ...DATA_SERVICES,
  AuthService,
  AuthGuardService,
  CustomThemeService,
  HttpService,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [CookieService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...DEVUI_CORE_PROVIDERS],
    };
  }
}
