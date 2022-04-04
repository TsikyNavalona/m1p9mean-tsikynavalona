import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { base_url } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  showAllRestaurant() {
    return this.http.get(base_url + 'showAllRestaurant');
  }

    showRestaurantById(id:any) {
      return this.http.get(base_url + 'showRestaurantById/' +id);
    }
}
