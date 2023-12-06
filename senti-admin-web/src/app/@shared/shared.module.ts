import { NullValueStringPipe } from './pipes/null-value.pipe';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

import {
  LayoutModule,
  AccordionModule,
  SearchModule,
  AvatarModule,
  BadgeModule,
  DropDownModule,
  FormModule,
  TabsModule,
  TextInputModule,
  ToggleModule,
  ButtonModule,
  DrawerModule,
  DCommonModule,
  AlertModule,
  ToastModule,
  TooltipModule,
  RadioModule,
  BreadcrumbModule,
  ModalModule,
  ProgressModule,
  DatepickerProModule,
  InputNumberModule,
  TreeModule,
  TransferModule,
  TagsModule,
  LoadingModule,
  PopoverModule,
} from 'ng-devui';
import { I18nModule } from 'ng-devui/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { DatepickerModule } from 'ng-devui/datepicker';
import { UploadModule } from 'ng-devui/upload';
import { TimeAxisModule } from 'ng-devui/time-axis';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalizeComponent } from './components/personalize/personalize.component';
import { HeaderOperationComponent } from './components/header/header-operation/header-operation.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { DaGridModule } from './layouts/da-grid';
import { HeaderLogoComponent } from './components/header/header-logo/header-logo.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RegisterComponent } from './components/register/register.component';
import { ForbiddenComponent } from './components/abnormal/forbidden/forbidden.component';
import { NotFoundComponent } from './components/abnormal/not-found/not-found.component';
import { ServerErrorComponent } from './components/abnormal/server-error/server-error.component';

const DEVUI_MODULES = [
  LayoutModule,
  AccordionModule,
  SearchModule,
  AvatarModule,
  BadgeModule,
  DropDownModule,
  FormModule,
  TabsModule,
  TextInputModule,
  ToggleModule,
  ButtonModule,
  DrawerModule,
  BreadcrumbModule,
  RadioModule,
  ModalModule,
  ProgressModule,
  DatepickerProModule,
  InputNumberModule,
  TreeModule,
  TransferModule,
  TagsModule,
  LoadingModule,
  PopoverModule,
];
const COMPONENTS = [HeaderComponent, FooterComponent, NavbarComponent, PersonalizeComponent];
const PIPES = [NullValueStringPipe];
@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    LoginComponent,
    HeaderOperationComponent,
    HeaderLogoComponent,
    SideMenuComponent,
    RegisterComponent,
    ForbiddenComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    DCommonModule,
    AlertModule,
    ClipboardModule,
    ToastModule,
    TooltipModule,
    I18nModule,
    DaGridModule,
    ...DEVUI_MODULES,
  ],
  providers: [DatePipe],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    HeaderLogoComponent,
    HeaderOperationComponent,
    I18nModule,
    DaGridModule,
    SideMenuComponent,
    ...DEVUI_MODULES,
    ...COMPONENTS,
    ForbiddenComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
