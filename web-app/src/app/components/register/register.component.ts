import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  username: string = '';
  password: string = '';
  number: string = '';
  email: string = '';
  adress: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  RegisterSubmit() {
    const customer = {
      name: this.name,
      username: this.username,
      password: this.password,
      number: this.number,
      email: this.email,
      adress: this.adress,
    };
    const onSuccess = (response: any) => {};
    const onError = (response: any) => {};
    try {
      this.customerService.newCustomer(customer).subscribe(onSuccess, onError);
      this.router.navigate(['/']);
    } catch (error) {}
  }
}
