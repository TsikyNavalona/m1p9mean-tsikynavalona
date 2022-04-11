import { Component, ElementRef,OnInit, OnDestroy,AfterViewInit,HostListener } from '@angular/core';
import {Meta ,Title} from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute,Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import {fromEvent, Subscription,Subject} from 'rxjs';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements AfterViewInit {

  list_order: any;
  orderDetail :any;
  $: any;

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
      this.titleService.setTitle("E-kaly : Order Admin ");
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngAfterViewInit(): void {
    const allParams = this.activatedRoute.snapshot.params;
    this.activatedRoute.paramMap.subscribe((x) => {
      //let idRestaurant = x.get('id');
      this.showAllOrder();

    })
  }

  showAllOrder(){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order=response['datas'];

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

    this.orderService.showAllOrder().subscribe(success, error);
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
}
