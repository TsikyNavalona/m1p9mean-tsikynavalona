import { Component, ElementRef,OnInit, OnDestroy,AfterViewInit,HostListener } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import {fromEvent, Subscription,Subject} from 'rxjs';
//import $ from 'jquery';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.css']
})
export class OrderCustomerComponent implements AfterViewInit  {
  list_order_customer: any;
  idCustomer = '';
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
    private router: Router) { }

  ngAfterViewInit(): void {
    const allParams = this.activatedRoute.snapshot.params;
    this.activatedRoute.paramMap.subscribe((x) => {
      let idCustomer = x.get('id');

      this.showAllOrderByCustomer(idCustomer);
    })
  }

  // ngOnDestroy(): void {
  //   //this.dtTrigger.unsubscribe();
  // }
  showAllOrderByCustomer(idCust:any){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order_customer = response['datas'];
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

    this.orderService.showAllOrderByCustomer(idCust).subscribe(success, error);
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
