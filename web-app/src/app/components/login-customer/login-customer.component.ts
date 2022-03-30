import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css'],
})
export class LoginCustomerComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  LoginSubmit() {
    const customer = {
      username: this.username,
      password: this.password,
    };
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.customerService.storeCustomerData(
          response.token,
          response.customer
        );
        this.router.navigate(['']);
      } else {
      }
    };
    const error = (response: any) => {};
    this.customerService
      .authenticateCustomer(customer)
      .subscribe(success, error);
  }
}
