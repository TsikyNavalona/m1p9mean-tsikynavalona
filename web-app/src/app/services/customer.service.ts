import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { base_url } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  authToken: any;
  customer: any;
  constructor(private http: HttpClient) {}

  newCustomer(customer: any) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.post(base_url + 'addCustomer', customer, {
      headers: httpHeaders,
    });
  }

  showAllCustomer() {
    return this.http.get(base_url + 'showAllCustomer');
  }

  authenticateCustomer(customer: any) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.post(base_url + 'authenticateCustomer', customer, {
      headers: httpHeaders,
    });
  }
  storeCustomerData(token: any, customer: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('customer', JSON.stringify(customer));
    this.authToken = token;
    this.customer = customer;
  }
  logOut() {
    this.authToken = null;
    this.customer = null;
    localStorage.clear();
  }
}
