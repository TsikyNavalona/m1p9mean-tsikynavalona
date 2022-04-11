import {  AfterViewInit, Component, OnInit,ViewChild, ElementRef,HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Enumerable from 'linq';
import {Meta ,Title} from "@angular/platform-browser";
import { fromEvent, Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { DelivererService } from '../../services/deliverer.service';

@Component({
  selector: 'app-deliverer-admin',
  templateUrl: './deliverer-admin.component.html',
  styleUrls: ['./deliverer-admin.component.css']
})
export class DelivererAdminComponent implements OnInit {
  list_deliverer: any = [];
  list_order_Delivered: any = [];

  dName:string ="";
  dUsername:string ="";
  dEmail:string ="";
  dNumber:string ="";
  dPassword:string ="";

  error_msg :string ="";
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == this.elRef.nativeElement.querySelector('#modalRegisterDeliverer')    ) {
      this.error_msg ='';
      this.elRef.nativeElement.querySelector('#modalRegisterDeliverer').style.display = "none";

    }
  }
  constructor(public elRef: ElementRef,
  private spinner: NgxSpinnerService,
  private titleService:Title,
  private orderService: OrderService,
  private router: Router,
  private delivererService: DelivererService) {
    this.titleService.setTitle("E-kaly : Deliverer Admin page"); }

  ngOnInit(): void {
    this.showAllDeliverer();
    this.showAllDeliveredOrder();
  }


  showAllDeliverer() {
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_deliverer = response['datas'];
        this.list_deliverer = this.list_deliverer.map((item: any) => {
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
    this.delivererService.showAllDeliverer().subscribe(success, error);
  }


  showAllDeliveredOrder(){
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.list_order_Delivered=response['datas'];

      } else {
        //this.error_msg = response['message'];
      }
    };
    const error = (response: any) => {
      this.router.navigate(['']);
    };

    this.orderService.showAllDeliveredOrder().subscribe(success, error);
  }

  registerDeliverer(){
    this.elRef.nativeElement.querySelector('#modalRegisterDeliverer').style.display = "block";

  }
  RegisterDelivererSubmit(){
    const deliverer = {
      dName: this.dName,
      dUsername: this.dUsername,
      dEmail: this.dEmail,
      dNumber: this.dNumber,
      dPassword: this.dPassword
    };

    const onSuccess = (response: any) => {};
    const onError = (response: any) => {};
    try {
      if(this.dName==""|| this.dUsername =="" || this.dEmail =="" || this.dNumber =="" || this.dPassword =="" || isNaN(+this.dNumber)){
        this.error_msg = "Please, complete all fields!";
      }
      else{
        this.delivererService.newDeliverer(deliverer).subscribe(onSuccess, onError);
        this.error_msg = "";
        setTimeout(() => {
        }, 1000);
        this.spinner.show();
        setTimeout(() => {
          this.dName="";this.dUsername="";this.dEmail="";this.dNumber="";this.dPassword="";
          this.ngOnInit();
          this.elRef.nativeElement.querySelector('#modalRegisterDeliverer').style.display = "none";
          this.spinner.hide();
        }, 1000);
      }

    } catch (error) {this.error_msg = "Please, complete all fields!";}
  }
}
