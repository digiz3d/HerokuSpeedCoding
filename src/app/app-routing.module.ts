import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes:Routes = [
    {path:'', redirectTo: '/login', pathMatch:'full'},
    {path:'login', component: FormLoginComponent},
    {path:'**', component: ErrorPageComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}



