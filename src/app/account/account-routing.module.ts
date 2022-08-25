import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from '../Home/homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { Login2Component } from './auth/login2/login2.component';
import { RegisterTenantResultComponent } from './auth/register/register-tenant-result/register-tenant-result.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  // { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
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
  },
  {
    path: 'home',
    component: HomepageComponent
},
  {
    path: 'register-tenant-result',
    component: RegisterTenantResultComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
