import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DelivererService } from '../services/deliverer.service';

@Injectable()
export class AuthDelivererGuard implements CanActivate {
  constructor(
    private delivererService: DelivererService,
    private router: Router
  ) {}

  canActivate() {
    if (this.delivererService.isTokExpired()) {
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
