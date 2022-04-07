import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import {Meta ,Title} from "@angular/platform-browser";
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  password: string = '';
  list_restaurant: any = [];

  constructor(
    private titleService:Title,
    private customerService: CustomerService,
    private router: Router,
    private restaurantService: RestaurantService
  ) {
    this.titleService.setTitle("E-kaly : Home Page");
  }

  ngOnInit(): void {
    this.showAllRestaurant();
  }
  onLogoutClick() {
    this.customerService.logOut();
    this.router.navigate(['/login-customer']);
    return false;
  }

  showAllRestaurant() {
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_restaurant = response['datas'];
        this.list_restaurant = this.list_restaurant.map((item: any) => {
          item.show = true;
          return item;
        });
      } else {
        //this.error_msg = response['message'];
      }
    };
    const error = (response: any) => {
      //this.error_msg = 'Erreur connexion';
    };
    this.restaurantService.showAllRestaurant().subscribe(success, error);
  }
}
