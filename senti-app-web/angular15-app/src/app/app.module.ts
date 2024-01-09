import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevUIModule } from 'ng-devui';
import { FormDesignComponent } from './pages/form-design/form-design.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { JwtModule } from '@auth0/angular-jwt';

//`TODO:` token
export function tokenGetter() {
  return localStorage.getItem('sentitoken');
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, FormDesignComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DevUIModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    JwtModule.forRoot({ config: { tokenGetter: () => tokenGetter(), authScheme: '' } }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
