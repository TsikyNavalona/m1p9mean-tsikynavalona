import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { base_url } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  authToken: any;
  admin: any;
  constructor(private http: HttpClient) { }

  showAllAdmin() {
    return this.http.get(base_url + 'showAllAdmin');
  }


  authenticateAdmin(admin: any) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.post(base_url + 'authenticateAdmin', admin, {
      headers: httpHeaders,
    });
  }
  storeAdminData(token: any, admin: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('admin', JSON.stringify(admin));
    this.authToken = token;
    this.admin = admin;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  logOut() {
    this.authToken = null;
    this.admin = null;
    localStorage.clear();
  }
  isTokExpired() {
    const jwtHelper = new JwtHelperService();
    this.loadToken();
    return jwtHelper.isTokenExpired(this.authToken);
  }
}
