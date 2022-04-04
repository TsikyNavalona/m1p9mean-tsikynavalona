import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  cName: string = '';
  cUsername: string = '';
  cPassword: string = '';
  cNumber: string = '';
  cEmail: string = '';
  cAdress: string = '';
  list_customer: any = [];
  error_msg: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showAllCustomer();
  }

  RegisterSubmit() {
    const customer = {
      cName: this.cName,
      cUsername: this.cUsername,
      cPassword: this.cPassword,
      cNumber: this.cNumber,
      cEmail: this.cEmail,
      cAdress: this.cAdress,
    };
    const onSuccess = (response: any) => {};
    const onError = (response: any) => {};
    try {
      this.customerService.newCustomer(customer).subscribe(onSuccess, onError);
      this.router.navigate(['/']);
    } catch (error) {}
  }
  showAllCustomer() {
    const success = (response: any) => {
      console.log(response['status']);
      if (response['status'] == 200) {
        this.list_customer = response['datas'];
        this.list_customer = this.list_customer.map((item: any) => {
          item.show = true;
          return item;
        });
      } else {
        this.error_msg = response['message'];
      }
    };
    const error = (response: any) => {
      this.error_msg = 'Erreur connexion';
    };
    this.customerService.showAllCustomer().subscribe(success, error);
  }
}
