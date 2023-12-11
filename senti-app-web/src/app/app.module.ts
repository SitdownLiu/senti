import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevUIModule } from 'ng-devui';
import { FormDesignComponent } from './pages/form-design/form-design.component';

@NgModule({
  declarations: [AppComponent, FormDesignComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DevUIModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
