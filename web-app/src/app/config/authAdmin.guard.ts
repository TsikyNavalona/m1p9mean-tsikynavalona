import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  canActivate() {
    if (this.adminService.isTokExpired()) {
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
