import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Injectable()
export class AuthRestoGuard implements CanActivate {
  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  canActivate() {
    if (this.restaurantService.isTokExpired()) {
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
