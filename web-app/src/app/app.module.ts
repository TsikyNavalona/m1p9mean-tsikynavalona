import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import {DataTablesModule} from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginCustomerComponent } from './components/login-customer/login-customer.component';
import { ProfileCustomerComponent } from './components/profile-customer/profile-customer.component';

import { AuthInterceptor } from './config/auth.interceptor';
import { AuthGuard } from './config/auth.guard';
import { AuthRestoGuard } from './config/authResto.guard';
import { AuthDelivererGuard } from './config/authDeliv.guard';
import { AuthAdminGuard } from './config/authAdmin.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListFoodComponent } from './components/list-food/list-food.component';
import { SharedService } from './services/shared.service';
import { OrderCustomerComponent } from './components/order-customer/order-customer.component';
import { OrderRestaurantComponent } from './components/order-restaurant/order-restaurant.component';
import { OrderDelivererComponent } from './components/order-deliverer/order-deliverer.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderAdminComponent } from './components/order-admin/order-admin.component';
import { RestaurantAdminComponent } from './components/restaurant-admin/restaurant-admin.component';
import { ManageRestaurantComponent } from './components/manage-restaurant/manage-restaurant.component';
import { DelivererAdminComponent } from './components/deliverer-admin/deliverer-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginCustomerComponent,
    ProfileCustomerComponent,
    NavbarComponent,
    ListFoodComponent,
    OrderCustomerComponent,
    OrderRestaurantComponent,
    OrderDelivererComponent,
    FooterComponent,
    OrderAdminComponent,
    RestaurantAdminComponent,
    ManageRestaurantComponent,
    DelivererAdminComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule,NgxSpinnerModule,DataTablesModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    AuthRestoGuard,
    AuthDelivererGuard,
    AuthAdminGuard,
    NavbarComponent,
    SharedService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
