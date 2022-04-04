import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css'],
})
export class ListFoodComponent implements OnInit {
  idRestaurant = '';
  restaurant: any;
  list_food_res: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    const allParams = this.activatedRoute.snapshot.params;
    this.activatedRoute.paramMap.subscribe((x) => {
      let idRestaurant = x.get('id');
      //this.afficherCovidStat(dateCovid);
      console.log(idRestaurant);
      this.showRestaurantById(idRestaurant);
      this.showAllFoodByRestaurant(idRestaurant);
    });
  }

  showRestaurantById(idRestaurant: any) {
    const success = (response: any) => {
      console.log(response['status']);
      if (response['status'] == 200) {
        this.restaurant = response['datas'];
        console.log(this.restaurant);
      } else {
        console.log('blem');
      }
    };
    const error = (response: any) => {
      console.log('blema');
    };
    this.restaurantService
      .showRestaurantById(idRestaurant)
      .subscribe(success, error);
  }
  showAllFoodByRestaurant(idRestaurant: any) {
    const success = (response: any) => {
      console.log(response['status']);
      if (response['status'] == 200) {
        this.list_food_res = response['datas'];
        console.log(this.list_food_res);
        this.list_food_res = this.list_food_res.map((item: any) => {
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
    this.foodService
      .showAllFoodByRestaurant(idRestaurant)
      .subscribe(success, error);
  }
}
