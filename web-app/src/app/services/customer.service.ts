import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  logOut() {
    this.authToken = null;
    this.customer = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('customer');
    localStorage.removeItem('restaurant');
    localStorage.removeItem('admin');
    localStorage.removeItem('deliverer');
    localStorage.removeItem('cardFood');
    localStorage.removeItem('TotalQuantityCart');
    localStorage.removeItem('AmountTotal');
  }
  isTokExpired() {
    const jwtHelper = new JwtHelperService();
    this.loadToken();
    return jwtHelper.isTokenExpired(this.authToken);
  }
  showProfile() {
    let httpHeaders = new HttpHeaders();
    this.loadToken();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Accept', 'application/json');

    return this.http.get(base_url + 'checkProfile', { headers: httpHeaders });
  }
}
