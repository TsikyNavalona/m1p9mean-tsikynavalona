import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.component.html',
  styleUrls: ['./profile-customer.component.css'],
})
export class ProfileCustomerComponent implements OnInit {
  customer: any;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const success = (response: any) => {
      if (response['status'] == 200) {
        console.log(response.customer.name);
      } else {
      }
    };
    const error = (response: any) => {
      this.router.navigate(['/login-customer']);
    };
    this.customerService.showProfile().subscribe(success, error);
  }
}
