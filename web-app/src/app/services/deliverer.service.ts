import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { base_url } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DelivererService {
  authToken: any;
  deliverer: any;
  constructor(private http: HttpClient) { }


    showAllDeliverer() {
      return this.http.get(base_url + 'showAllDeliverer');
    }
    newDeliverer(deliverer: any) {
      let httpHeaders = new HttpHeaders();
      httpHeaders.append('Content-Type', 'application/json');
      return this.http.post(base_url + 'addDeliverer', deliverer, {
        headers: httpHeaders,
      });
    }

    authenticateDeliverer(deliverer: any) {
      let httpHeaders = new HttpHeaders();
      httpHeaders.append('Content-Type', 'application/json');
      return this.http.post(base_url + 'authenticateDeliverer', deliverer, {
        headers: httpHeaders,
      });
    }

    storeDelivererData(token: any, deliverer: any) {
      localStorage.setItem('id_token', token);
      localStorage.setItem('deliverer', JSON.stringify(deliverer));
      this.authToken = token;
      this.deliverer = deliverer;
    }
    loadToken() {
      const token = localStorage.getItem('id_token');
      this.authToken = token;
    }
    logOut() {
      this.authToken = null;
      this.deliverer = null;
      localStorage.clear();
    }
    isTokExpired() {
      const jwtHelper = new JwtHelperService();
      this.loadToken();
      return jwtHelper.isTokenExpired(this.authToken);
    }
}
