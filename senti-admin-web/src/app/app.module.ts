import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { I18N } from '../config/language-config';
import { FormSchemaModule } from './pages/schemas/form-schema/form-schema.module';

//`TODO:` token
export function tokenGetter() {
  return localStorage.getItem('sentitoken');
}

class I18NLoader implements TranslateLoader {
  getTranslation(lang: 'zh-cn' | 'en-us'): Observable<Object> {
    return of(I18N[lang]);
  }
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    JwtModule.forRoot({ config: { tokenGetter: () => tokenGetter(), authScheme: '' } }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: I18NLoader,
      },
    }),
    FormSchemaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
