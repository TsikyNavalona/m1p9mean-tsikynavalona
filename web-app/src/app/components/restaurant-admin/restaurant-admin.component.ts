import {  AfterViewInit, Component, OnInit,ViewChild, ElementRef,HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Enumerable from 'linq';
import {Meta ,Title} from "@angular/platform-browser";
import { fromEvent, Subscription } from 'rxjs';
import { RestaurantService } from '../../services/restaurant.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-restaurant-admin',
  templateUrl: './restaurant-admin.component.html',
  styleUrls: ['./restaurant-admin.component.css']
})
export class RestaurantAdminComponent implements OnInit {
  list_restaurant: any = [];
  list_order:  any = [];
  totalAmount : number =0;
  totalBenefit: number =0;
  list_Amount_per_Restaurant :any =[]
  list_Benefit_per_Restaurant :any =[]

  rName :string ="";
  rDescription :string ="";
  rPassword :string ="";
  rNumber :string ="";
  rEmail :string ="";
  rAdress :string ="";
  rLogo :string ="";
  error_msg :string ="";

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == this.elRef.nativeElement.querySelector('#modalRegisterRestaurant')    ) {
      this.error_msg ='';
      this.elRef.nativeElement.querySelector('#modalRegisterRestaurant').style.display = "none";

    }
  }
  constructor(
    public elRef: ElementRef,
    private spinner: NgxSpinnerService,
    private titleService:Title,
    private orderService: OrderService,
    private router: Router,
    private restaurantService: RestaurantService) {
        this.titleService.setTitle("E-kaly : Restaurant Admin page");
    }

  ngOnInit(): void {
    this.showAllRestaurant();
    this.showAllOrder();
    //const total = this.list_order.carts.value.reduce((sum, item) => sum + item.Amt, 0);
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


  showAllOrder(){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order=response['datas'];
        this.list_order = this.list_order.map((item: any) => {
          item.show = true;
          return item;
        });

        this.totalAmount = this.list_order.reduce((sum:any, item:any) => sum + item.oAmount, 0);
        ////////////////////////////////////////////////////////////
        let totalB : number =0;
        this.list_order.forEach((item:any) => {
          item.allFoodOrdered.forEach((item2:any) => {
            totalB +=item2.oFood.fBenefit*item2.quantity;
          });
        });
        this.totalBenefit=(totalB);
/////////////////////////////////////////////////////////////////////////////
        //console.log(this.list_order);

        let opClasses:any = [];
        this.list_order.forEach(function(item:any) {
            var existing = opClasses.find(function(each:any) {
                return each.oRestaurant._id === item.oRestaurant._id;
            });
            if (existing) {
                existing.oAmount = parseInt(existing.oAmount) + parseInt(item.oAmount);
            } else {
                opClasses.push(item);
            }
        });
        this.list_Amount_per_Restaurant= opClasses;
/////////////////////////////////////////////////////////////////////////////
        let opClasses2:any = [];
        this.list_order.forEach(function(item:any) {
            var existing = opClasses2.find(function(each:any) {
                return each.oRestaurant._id === item.oRestaurant._id;
            });
            if (existing) {
                existing.oBenefit = parseInt(existing.oBenefit) + parseInt(item.oBenefit);
            } else {
                opClasses2.push(item);
            }
        });

        this.list_Benefit_per_Restaurant= opClasses2;
      }
    };
    const error = (response: any) => {
      this.router.navigate(['']);
    };

    this.orderService.showAllOrder().subscribe(success, error);
  }


  registerRestaurant(){
    this.elRef.nativeElement.querySelector('#modalRegisterRestaurant').style.display = "block";

  }
  RegisterRestaurantSubmit(){
    const restaurant = {
      rName: this.rName,
      rDescription: this.rDescription,
      rPassword: this.rPassword,
      rNumber: this.rNumber,
      rEmail: this.rEmail,
      rAdress: this.rAdress,
      rLogo: "null"
    };
    const onSuccess = (response: any) => {};
    const onError = (response: any) => {};
    try {
      if(this.rName==""|| this.rDescription =="" || this.rPassword =="" || this.rNumber =="" || this.rEmail =="" || this.rAdress ==""){
        this.error_msg = "Please, complete all fields!";
      }
      else{
        this.restaurantService.newRestaurant(restaurant).subscribe(onSuccess, onError);
        this.error_msg = "";
        setTimeout(() => {
        }, 1000);
        this.spinner.show();
        setTimeout(() => {
          this.rName="";this.rDescription="";this.rPassword="";this.rNumber="";this.rEmail="";this.rAdress="";
          this.ngOnInit();
          this.elRef.nativeElement.querySelector('#modalRegisterRestaurant').style.display = "none";
          this.spinner.hide();
        }, 1000);
      }

    } catch (error) {this.error_msg = "Please, complete all fields!";}

  }
}
