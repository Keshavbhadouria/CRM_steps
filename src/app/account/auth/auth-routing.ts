import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login-2',
        component: Login2Component
    },
    {
      path: 'signup',
      component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
