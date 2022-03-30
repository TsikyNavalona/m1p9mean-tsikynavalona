import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginCustomerComponent } from './components/login-customer/login-customer.component';
import { ProfileCustomerComponent } from './components/profile-customer/profile-customer.component';

import { AuthGuard } from './config/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login-customer',
    component: LoginCustomerComponent,
  },
  {
    path: 'profile-customer',
    component: ProfileCustomerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
