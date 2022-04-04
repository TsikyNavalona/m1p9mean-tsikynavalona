import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { base_url } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  showAllFood() {
    return this.http.get(base_url + 'showAllFood');
  }

  showAllFoodByRestaurant(id: any) {
    return this.http.get(base_url + 'showAllFoodByRestaurant/' + id);
  }
}
