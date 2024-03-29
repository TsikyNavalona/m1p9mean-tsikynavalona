import { Component, ElementRef,OnInit, OnDestroy,AfterViewInit,HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {Meta ,Title} from "@angular/platform-browser";
import { ActivatedRoute,Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import {fromEvent, Subscription,Subject} from 'rxjs';

@Component({
  selector: 'app-order-restaurant',
  templateUrl: './order-restaurant.component.html',
  styleUrls: ['./order-restaurant.component.css']
})
export class OrderRestaurantComponent implements OnInit {

  //listCardSrc: Subject<any>;
  //public listCardValueSecond: any;

  list_order_restaurant_notP :any;
  list_order_restaurant_F :any;
  idRestaurant = '';
  orderDetail :any;
  $: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
  if(event.target == this.elRef.nativeElement.querySelector('#detailOrder')) {
    this.orderDetail = null;
    this.elRef.nativeElement.querySelector('#detailOrder').style.display = "none";
    }
  }
  constructor(
    private titleService:Title,
    public elRef: ElementRef,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router) {
      this.titleService.setTitle("E-kaly : Order Restaurant ");
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    const allParams = this.activatedRoute.snapshot.params;
    this.activatedRoute.paramMap.subscribe((x) => {
      let idRestaurant = x.get('id');

      this.showAllOrderByRestaurantF(idRestaurant);
      this.showAllOrderByRestaurantNP(idRestaurant);

    })
  }
  showAllOrderByRestaurantNP(idRest:any){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order_restaurant_notP=response['datas'];

            $('#example').DataTable({
              "retrieve": true,
              "paging":   false,
              "info":     false,
              "language": {
                "zeroRecords":    "",
                "emptyTable":     "",
              }
            });
      } else {
        //this.error_msg = response['message'];
      }
    };
    const error = (response: any) => {
      this.router.navigate(['']);
    };

    this.orderService.showAllOrderByRestaurantV2(idRest,"1").subscribe(success, error);
  }

  showAllOrderByRestaurantF(idRest:any){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order_restaurant_F=response['datas'];

          try {
            $('#okok').DataTable({
              "retrieve": true,
              "paging":   false,
              "info":     false,
              "language": {
                "zeroRecords":    "",
                "emptyTable":     "",
              }
            });
          } catch (error) {
          }
      } else {
        //this.error_msg = response['message'];
      }
    };
    const error = (response: any) => {
      this.router.navigate(['']);
    };

    this.orderService.showAllOrderByRestaurantV2(idRest,"2").subscribe(success, error);
  }

  detailOrder(idOrder :any){
    this.elRef.nativeElement.querySelector('#detailOrder').style.display = "block";
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.orderDetail = response['datas'].allFoodOrdered;
      } else {
      }
    };
    const error = (response: any) => {
    };
    this.orderService.showOrderById(idOrder).subscribe(success, error);
  }


  setToPrepared(idOrder:any){
    let restaurant = JSON.parse(localStorage.getItem("restaurant") || "" );
    const order = {
      status: "prepared",
    };
    const onSuccess = (response: any) => {};
    const onError = (response: any) => {};
    try {
      this.spinner.show();
      setTimeout(()=>{
          this.orderService.updateOrderById(idOrder,order).subscribe(onSuccess, onError);

          //this.showAllOrderByRestaurantNP(restaurant.id);
          //this.showAllOrderByRestaurantF(restaurant.id);
        try {
          this.ngOnInit();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.navigate([''],{
            relativeTo: this.activatedRoute
          })
        } catch (error) {
        }
        this.spinner.hide();
      },500);
      //this.router.navigate(['/order-restaurant/'+restaurant.id]);
    } catch (error) {}
  }
}
