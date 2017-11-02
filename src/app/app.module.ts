import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from  '@angular/forms';
import{ HttpClientModule }from '@angular/common/http';
import { NgModule } from '@angular/core';
import{ RouterModule, Route }from '@angular/router';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
