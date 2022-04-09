import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { base_url } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  newOrder(order: any) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.post(base_url + 'addOrder', order, {
      headers: httpHeaders,
    });
  }
}
