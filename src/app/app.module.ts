import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from  '@angular/forms';
import{ HttpClientModule }from '@angular/common/http';
import { NgModule } from '@angular/core';
import{ RouterModule, Route }from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    ErrorPageComponent,
    TransactionListComponent
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