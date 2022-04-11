import { AfterViewInit,Component, OnInit ,ElementRef,HostListener,ViewChildren,QueryList,Injectable} from '@angular/core';
import {Meta ,Title} from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { fromEvent, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodService } from '../../services/food.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnInit {
  restaurant: any;
  list_food_res: any = [];
  fName:string ="";
  fDescription:string ="";
  fPrice:string ="";
  fBenefit:string ="";
  error_msg:string ="";

  list_order_restaurant : any = [];
  totalAmount : number =0;
  totalBenefit: number =0;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == this.elRef.nativeElement.querySelector('#modalAddFood')    ) {
      this.error_msg ='';
      this.elRef.nativeElement.querySelector('#modalAddFood').style.display = "none";

    }
  }

  constructor(
    private titleService:Title,
    private elRef: ElementRef,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private foodService: FoodService,
    private orderService: OrderService) {
      this.titleService.setTitle("E-kaly : Manage Restaurant");}

  ngOnInit(): void {
    const allParams = this.activatedRoute.snapshot.params;
    this.activatedRoute.paramMap.subscribe((x) => {
      let idRestaurant = x.get('id');
      this.showRestaurantById(idRestaurant);
      this.showAllFoodByRestaurant(idRestaurant);
      this.showAllOrderByRestaurant(idRestaurant);
    })
  }

  showRestaurantById(idRestaurant: any) {
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.restaurant = response['datas'];
      } else {
      }
    };
    const error = (response: any) => {
    };
    this.restaurantService
      .showRestaurantById(idRestaurant)
      .subscribe(success, error);
  }

  showAllFoodByRestaurant(idRestaurant: any) {
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_food_res = response['datas'];
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
  addFood(){
    this.elRef.nativeElement.querySelector('#modalAddFood').style.display = "block";
  }
  addFoodSubmit(){
    let restaurant = JSON.parse(localStorage.getItem("restaurant") || "" );
    const food = {
      fName: this.fName,
      fDescription: this.fDescription,
      fPrice: this.fPrice,
      fBenefit: this.fBenefit,
      fImage: "null",
      fRestaurant: restaurant.id,
    };
    console.log(food);
    const onSuccess = (response: any) => {};
    const onError = (response: any) => {};
    try {
      if(this.fName==""|| this.fDescription =="" || this.fPrice =="" || this.fBenefit =="" || isNaN(+this.fPrice) || isNaN(+this.fBenefit)){
        this.error_msg = "Please, complete all fields!";
      }
      else{
        this.foodService.newFood(food).subscribe(onSuccess, onError);
        this.error_msg = "";
        setTimeout(() => {
        }, 1000);
        this.spinner.show();
        setTimeout(() => {
          this.fName="";this.fDescription="";this.fPrice="";this.fBenefit="";
          this.ngOnInit();
          this.elRef.nativeElement.querySelector('#modalAddFood').style.display = "none";
          this.spinner.hide();
        }, 1000);
      }

    } catch (error) {this.error_msg = "Please, complete all fields!";}
  }
  showAllOrderByRestaurant(idRest:any){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order_restaurant=response['datas'];

        this.totalAmount = this.list_order_restaurant.reduce((sum:any, item:any) => sum + item.oAmount, 0);
        this.totalBenefit = this.list_order_restaurant.reduce((sum:any, item:any) => sum + item.oBenefit, 0);
      } else {
        //this.error_msg = response['message'];
      }
    };
    const error = (response: any) => {
      this.router.navigate(['']);
    };

    this.orderService.showAllOrderByRestaurant(idRest).subscribe(success, error);
  }
}
