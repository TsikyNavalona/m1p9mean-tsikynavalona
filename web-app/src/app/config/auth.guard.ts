import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  canActivate() {
    if (this.customerService.isTokExpired()) {
      this.router.navigate(['login-customer']);
      return false;
    } else {
      return true;
    }
  }
}
