import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginCustomerComponent } from './components/login-customer/login-customer.component';
import { ProfileCustomerComponent } from './components/profile-customer/profile-customer.component';
import { ListFoodComponent } from './components/list-food/list-food.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderCustomerComponent } from './components/order-customer/order-customer.component';
import { OrderRestaurantComponent } from './components/order-restaurant/order-restaurant.component';
import { OrderDelivererComponent } from './components/order-deliverer/order-deliverer.component';
import { OrderAdminComponent } from './components/order-admin/order-admin.component';
import { RestaurantAdminComponent } from './components/restaurant-admin/restaurant-admin.component';
import { ManageRestaurantComponent } from './components/manage-restaurant/manage-restaurant.component';

import { AuthGuard } from './config/auth.guard';
import { AuthRestoGuard } from './config/authResto.guard';
import { AuthDelivererGuard } from './config/authDeliv.guard';
import { AuthAdminGuard } from './config/authAdmin.guard';

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
  {
    path: 'list-food/:id',
    component: ListFoodComponent,
  },
  {
    path: 'nav-bar',
    component: NavbarComponent,
  },
  {
    path: 'order-customer/:id',
    component: OrderCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-restaurant/:id',
    component: OrderRestaurantComponent,
    canActivate: [AuthRestoGuard],
  },
  {
    path: 'order-deliverer/:id',
    component: OrderDelivererComponent,
    canActivate: [AuthDelivererGuard],
  },
  {
    path: 'order-admin/:id',
    component: OrderAdminComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'restaurant-admin/:id',
    component: RestaurantAdminComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'manage-restaurant/:id',
    component: ManageRestaurantComponent,
    canActivate: [AuthRestoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
