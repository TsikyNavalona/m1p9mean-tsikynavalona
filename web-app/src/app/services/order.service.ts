import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { base_url } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  authToken: any;
  customer: any;

  constructor(private http: HttpClient) { }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  newOrder(order: any) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.post(base_url + 'addOrder', order, {
      headers: httpHeaders,
    });
  }

  showAllOrder() {
    return this.http.get(base_url + 'showAllOrder');
  }

  showOrderById(id: any) {
    return this.http.get(base_url + 'showOrderById/' + id);
  }

  showAllOrderByCustomer(id: any){
    let httpHeaders = new HttpHeaders();
    this.loadToken();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Accept', 'application/json');
    return this.http.get(base_url + 'showAllOrderByCustomer/'+id, { headers: httpHeaders });
  }

  showAllOrderByRestaurant(id: any){
    let httpHeaders = new HttpHeaders();
    this.loadToken();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Accept', 'application/json');
    return this.http.get(base_url + 'showAllOrderByRestaurant/'+id, { headers: httpHeaders });
  }
  showAllOrderByDeliverer(id: any){
    let httpHeaders = new HttpHeaders();
    this.loadToken();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Accept', 'application/json');
    return this.http.get(base_url + 'showAllOrderByDeliverer/'+id, { headers: httpHeaders });
  }
  showAllOrderByRestaurantV2(id: any,status: any){
    let httpHeaders = new HttpHeaders();
    this.loadToken();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Accept', 'application/json');
    return this.http.get(base_url + 'showAllOrderByRestaurantV2/'+id+'/'+status, { headers: httpHeaders });
  }
  showAllPreparedOrder (){
    return this.http.get(base_url + 'showAllPreparedOrder');
  }
  updateOrderById(id:any, order:any){
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.patch(base_url + 'updateOrderById/'+id, order, {
      headers: httpHeaders,
    });
  }
}
