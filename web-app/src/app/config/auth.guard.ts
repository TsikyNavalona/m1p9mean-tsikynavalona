import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { RestaurantService } from '../services/restaurant.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private customerService: CustomerService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  canActivate() {
    if (this.customerService.isTokExpired()) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
  // canActivateRestaurant(){
  //   isTokExpired
  // }
}
