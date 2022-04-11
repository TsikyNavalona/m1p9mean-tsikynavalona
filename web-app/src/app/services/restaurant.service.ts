import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { base_url } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  authToken: any;
  restaurant: any;
  constructor(private http: HttpClient) {}

  showAllRestaurant() {
    return this.http.get(base_url + 'showAllRestaurant');
  }
  newRestaurant(restaurant: any) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.post(base_url + 'addRestaurant', restaurant, {
      headers: httpHeaders,
    });
  }
    showRestaurantById(id:any) {
      return this.http.get(base_url + 'showRestaurantById/' +id);
    }

    authenticateRestaurant(restaurant: any) {
      let httpHeaders = new HttpHeaders();
      httpHeaders.append('Content-Type', 'application/json');
      return this.http.post(base_url + 'authenticateRestaurant', restaurant, {
        headers: httpHeaders,
      });
    }

    storeRestaurantData(token: any, restaurant: any) {
      localStorage.setItem('id_token', token);
      localStorage.setItem('restaurant', JSON.stringify(restaurant));
      this.authToken = token;
      this.restaurant = restaurant;
    }
    loadToken() {
      const token = localStorage.getItem('id_token');
      this.authToken = token;
    }
    logOut() {
      this.authToken = null;
      this.restaurant = null;
      localStorage.clear();
    }
    isTokExpired() {
      const jwtHelper = new JwtHelperService();
      this.loadToken();
      return jwtHelper.isTokenExpired(this.authToken);
    }
}
