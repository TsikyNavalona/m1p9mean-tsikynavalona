import { Component, ElementRef,OnInit, OnDestroy,AfterViewInit,HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute,Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import {fromEvent, Subscription,Subject} from 'rxjs';

@Component({
  selector: 'app-order-deliverer',
  templateUrl: './order-deliverer.component.html',
  styleUrls: ['./order-deliverer.component.css']
})
export class OrderDelivererComponent implements AfterViewInit {

  list_order_Prepared :any;
  list_order_By_Deliv :any;
  idDeliverer :any;
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
    public elRef: ElementRef,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngAfterViewInit(): void {
    const allParams = this.activatedRoute.snapshot.params;
    this.activatedRoute.paramMap.subscribe((x) => {
      let idDeliverer = x.get('id');
      this.showAllPreparedOrder();
      this.showAllOrderByDeliverer(idDeliverer);
    })
  }
  showAllPreparedOrder(){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order_Prepared=response['datas'];

        setTimeout(()=>{
          try {
            $('#example').DataTable();
          } catch (error) {
          }
        },0);
      } else {
        //this.error_msg = response['message'];
      }
    };
    const error = (response: any) => {
      this.router.navigate(['']);
    };

    this.orderService.showAllPreparedOrder().subscribe(success, error);
  }

  showAllOrderByDeliverer(idDeliv:any){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order_By_Deliv=response['datas'];

        setTimeout(()=>{
          try {
            $('#okok').DataTable();
          } catch (error) {
          }
        },0);
      } else {
      }
    };
    const error = (response: any) => {
      this.router.navigate(['']);
    };

    this.orderService.showAllOrderByDeliverer(idDeliv).subscribe(success, error);
  }
  //showAllOrderByDeliverer
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


  setToDelivered(idOrder :any){
    let deliverer = JSON.parse(localStorage.getItem("deliverer") || "" );
    const order= {
      status: "delivered",
      oDeliverer : deliverer.id
    };
    const onSuccess = (response: any) => {};
    const onError = (response: any) => {};
    try {
      this.spinner.show();
      setTimeout(()=>{
          this.orderService.updateOrderById(idOrder,order).subscribe(onSuccess, onError);
        try {
          //this.ngAfterViewInit();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.navigate(['/order-deliverer/'+deliverer.id],{
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
