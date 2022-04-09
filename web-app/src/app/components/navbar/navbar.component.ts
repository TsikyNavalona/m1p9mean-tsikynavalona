import {  AfterViewInit, Component, OnInit,ViewChild, ElementRef,HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { RestaurantService } from '../../services/restaurant.service';
import { DelivererService } from '../../services/deliverer.service';
import { AdminService } from '../../services/admin.service';
import { FoodService } from '../../services/food.service';
import { OrderService } from '../../services/order.service';
import { SharedService } from '../../services/shared.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements  AfterViewInit {


  quantitySrc: Subject<string>;
  public quantityValueSecond: string = "";

  listCardSrc: Subject<any>;
  public listCardValueSecond: any;

  totalAmountSrc :Subject<string>;
  public totalAmountValueSecond: string ="";

  usernameCustLog: string = '';
  passwordCustLog: string = '';

  usernameRestauLog: string = '';
  passwordRestauLog: string = '';

  usernameDelivLog: string = '';
  passwordDelivLog: string = '';

  usernameAdminLog: string = '';
  passwordAdminLog: string = '';

  nameCustReg: string = '';
  usernameCustReg: string = '';
  emailCustReg: string = '';
  numberCustReg: string = '';
  adressCustReg: string = '';
  passwordCustReg: string = '';

  role :string = '';
  error_msg:string = '';
  data: any ;

  quantityCard :string ='';
  listCard : any;
  totalAmount :string ="";

  listIdFood :string[] = [];
  listCardWName :any
  foodSelected:any;
  stringLId:any;

  constructor(public elRef: ElementRef,
  private spinner: NgxSpinnerService,
  private customerService: CustomerService,
  private restaurantService: RestaurantService,
  private delivererService: DelivererService,
  private adminService: AdminService,
  private router: Router,
  private foodService: FoodService,
  private orderService: OrderService,
  private shared: SharedService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    } ;

    this.quantitySrc = this.shared.quantitySource;

    this.quantitySrc.subscribe(value => {
      this.quantityValueSecond = value;
    });


    this.totalAmountSrc = this.shared.amountTotalSource;

    this.totalAmountSrc.subscribe(value => {
      this.totalAmountValueSecond = value;
    });


    this.listCardSrc = this.shared.listCardSource;

    this.listCardSrc.subscribe(value => {
      this.listCardValueSecond = value;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == this.elRef.nativeElement.querySelector('#modalCard') ||
    event.target == this.elRef.nativeElement.querySelector('#modalLoginChoice') ||
    event.target == this.elRef.nativeElement.querySelector('#modalLogCustomer')  ||
    event.target == this.elRef.nativeElement.querySelector('#modalLogRestaur')  ||
    event.target == this.elRef.nativeElement.querySelector('#modalLogDeliver')  ||
    event.target == this.elRef.nativeElement.querySelector('#modalLogAdmin')  ||
    event.target == this.elRef.nativeElement.querySelector('#modalRegiCustomer')||
    event.target == this.elRef.nativeElement.querySelector('#modalcustomerMenu') ||
    event.target == this.elRef.nativeElement.querySelector('#modalrestaurantMenu')||
    event.target == this.elRef.nativeElement.querySelector('#modaldelivererMenu') ||
    event.target == this.elRef.nativeElement.querySelector('#modaladminMenu')    ) {
      this.error_msg ='';
      this.elRef.nativeElement.querySelector('#modalCard').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLoginChoice').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLogCustomer').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLogRestaur').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLogDeliver').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLogAdmin').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalRegiCustomer').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalcustomerMenu').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalrestaurantMenu').style.display = "none";
      this.elRef.nativeElement.querySelector('#modaldelivererMenu').style.display = "none";
      this.elRef.nativeElement.querySelector('#modaladminMenu').style.display = "none";

    }
  }


  clickedElement: Subscription = new Subscription();

  public checkExistToken(key :string=""):boolean {
   if (localStorage.getItem(key)) {
     this.data = JSON.parse(localStorage.getItem(key) || "");
     //this.data =localSValue.cUsername;
     //console.log(this.data);
     this.elRef.nativeElement.querySelector('#connectedId').style.display = "none";
     return true;
   } else {
     return false;
   };
 }
 public checkUserNotCustomer():boolean{
   if ( localStorage.getItem("admin") || localStorage.getItem("restaurant") || localStorage.getItem("deliverer")) {
     return false;
   }
   else{
     return true;
   }
}
  ngOnInit(): void {
    //this.checkExistToken()





  }
  public ngAfterViewInit():void{
    setTimeout(()=>{
      this.quantityCard = localStorage.getItem("TotalQuantityCart")  || "";
      this.totalAmount = localStorage.getItem("AmountTotal") || "";
    }
    ,0);
    // if( localStorage.getItem("customer")){
    //   this.elRef.nativeElement.querySelector('#connectedId').style.display = "none";
    //   this.customer = localStorage.getItem("customer")
      //  this.clickedElement =  fromEvent(this.elRef.nativeElement.querySelector('#showCustomerMenu'), 'click').subscribe(() => {
      //   this.elRef.nativeElement.querySelector('#modalCustomerMenu').style.display = "block";
      //   this.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
      //   this.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
      //   this.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
      //   this.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
      //   this.elRef.nativeElement.querySelector('form').classList.remove('active');
      //   this.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
      // });
    // }
    if(localStorage.getItem("admin")  || localStorage.getItem("restaurant") || localStorage.getItem("deliverer")){
      this.elRef.nativeElement.querySelector('#connectedId').style.display = "none";
    }

    var menu = this.elRef.nativeElement.querySelector('.menu-icon span');
    var search = this.elRef.nativeElement.querySelector('.search-icon');
    var cancel = this.elRef.nativeElement.querySelector('.cancel-icon');
    var nav = this.elRef.nativeElement.querySelector('.nav-items');
    var form = this.elRef.nativeElement.querySelector('form');

    var modalCard = this.elRef.nativeElement.querySelector('#modalCard');
    var showCart = this.elRef.nativeElement.querySelector('#showCart');
    var closeCard = this.elRef.nativeElement.querySelector('.closeCard');

    var modalLoginChoice = this.elRef.nativeElement.querySelector('#modalLoginChoice');
    var showChoiceLogin = this.elRef.nativeElement.querySelector('#showChoiceLogin');
    var closeLoginChoice = this.elRef.nativeElement.querySelector('.closeLoginChoice');

    var modalLogCustomer =this.elRef.nativeElement.querySelector('#modalLogCustomer');
    var showLogCustomer = this.elRef.nativeElement.querySelector('#showLogCustomer');

    var modalRegiCustomer =this.elRef.nativeElement.querySelector('#modalRegiCustomer');
    var showRegisCustomer = this.elRef.nativeElement.querySelector('#showRegisCustomer');

    var modalLogRestaur =this.elRef.nativeElement.querySelector('#modalLogRestaur');
    var showLogRestaur = this.elRef.nativeElement.querySelector('#showLogRestaur');

    var modalLogDeliver =this.elRef.nativeElement.querySelector('#modalLogDeliver');
    var showLogDeliver = this.elRef.nativeElement.querySelector('#showLogDeliver');

    var modalLogAdmin =this.elRef.nativeElement.querySelector('#modalLogAdmin');
    var showLogAdmin = this.elRef.nativeElement.querySelector('#showLogAdmin');

    var reshowLogCustomer = this.elRef.nativeElement.querySelector('#reshowLogCustomer');

    var modalCustMenu= this.elRef.nativeElement.querySelector('#modalCustMenu');
    var showCustomerMenu =this.elRef.nativeElement.querySelector('#showCustomerMenu');

    this.clickedElement = fromEvent(menu, 'click').subscribe(() => {
      nav.classList.add('active');
      menu.classList.add('hide');
      search.classList.add('hide');
      cancel.classList.add('show');
      form.classList.remove('active');
    });

    this.clickedElement = fromEvent(cancel, 'click').subscribe(() => {
      nav.classList.remove('active');
      menu.classList.remove('hide');
      search.classList.remove('hide');
      cancel.classList.remove('show');
      form.classList.remove('active');
      cancel.style.color = '#ff3d00';
    });

    this.clickedElement = fromEvent(search, 'click').subscribe(() => {
      form.classList.add('active');
      search.classList.add('hide');
      cancel.classList.add('show');
    });

    // this.clickedElement = fromEvent(showCart, 'click').subscribe(() => {
    //   modalCard.style.display = "block";
    //   nav.classList.remove('active');
    //   menu.classList.remove('hide');
    //   search.classList.remove('hide');
    //   cancel.classList.remove('show');
    //   form.classList.remove('active');
    //   cancel.style.color = '#ff3d00';
    // });


    this.clickedElement = fromEvent(showChoiceLogin, 'click').subscribe(() => {
      modalLoginChoice.style.display = "block";
      nav.classList.remove('active');
      menu.classList.remove('hide');
      search.classList.remove('hide');
      cancel.classList.remove('show');
      form.classList.remove('active');
      cancel.style.color = '#ff3d00';
    });

    this.clickedElement = fromEvent(closeLoginChoice, 'click').subscribe(() => {
      modalLoginChoice.style.display = "none";
    });

    this.clickedElement = fromEvent(showLogCustomer, 'click').subscribe(() => {
      modalLogCustomer.style.display = "block";
      modalLoginChoice.style.display = "none";
      modalRegiCustomer.style.display = "none";
    });

    this.clickedElement = fromEvent(reshowLogCustomer, 'click').subscribe(() => {
      modalLogCustomer.style.display = "block";
      modalLoginChoice.style.display = "none";
      modalRegiCustomer.style.display = "none";
    });

    this.clickedElement = fromEvent(showRegisCustomer, 'click').subscribe(() => {
      modalRegiCustomer.style.display = "block";
      modalLogCustomer.style.display = "none";
    });

    this.clickedElement = fromEvent(showLogRestaur, 'click').subscribe(() => {
      modalLogRestaur.style.display = "block";
      modalLoginChoice.style.display = "none";
    });

    this.clickedElement = fromEvent(showLogDeliver, 'click').subscribe(() => {
      modalLogDeliver.style.display = "block";
      modalLoginChoice.style.display = "none";
    });

    this.clickedElement = fromEvent(showLogAdmin, 'click').subscribe(() => {
      modalLogAdmin.style.display = "block";
      modalLoginChoice.style.display = "none";
    });

    if( this.checkExistToken("customer")){
     //  setTimeout(()=>this.clickedElement =  fromEvent(this.elRef.nativeElement.querySelector('#showcustomerMenu'), 'click').subscribe(() => {
     //   this.elRef.nativeElement.querySelector('#modalcustomerMenu').style.display = "block";
     //   this.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
     //   this.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
     //   this.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
     //   this.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
     //   this.elRef.nativeElement.querySelector('form').classList.remove('active');
     //   this.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
     // }),0)
    }
    if( this.checkExistToken("restaurant")){
      setTimeout(()=>this.clickedElement =  fromEvent(this.elRef.nativeElement.querySelector('#showrestaurantMenu'), 'click').subscribe(() => {
       this.elRef.nativeElement.querySelector('#modalrestaurantMenu').style.display = "block";
       this.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
       this.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
       this.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
       this.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
       this.elRef.nativeElement.querySelector('form').classList.remove('active');
       this.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
     }),0)
    }
    if( this.checkExistToken("deliverer")){
      setTimeout(()=>this.clickedElement =  fromEvent(this.elRef.nativeElement.querySelector('#showdelivererMenu'), 'click').subscribe(() => {
       this.elRef.nativeElement.querySelector('#modaldelivererMenu').style.display = "block";
       this.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
       this.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
       this.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
       this.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
       this.elRef.nativeElement.querySelector('form').classList.remove('active');
       this.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
     }),0)
    }
    if( this.checkExistToken("admin")){
      setTimeout(()=>this.clickedElement =  fromEvent(this.elRef.nativeElement.querySelector('#showadminMenu'), 'click').subscribe(() => {
       this.elRef.nativeElement.querySelector('#modaladminMenu').style.display = "block";
       this.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
       this.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
       this.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
       this.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
       this.elRef.nativeElement.querySelector('form').classList.remove('active');
       this.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
     }),0)
    }

  }

  // test(){
  //   setTimeout(()=>this.clickedElement =  fromEvent(this.elRef.nativeElement.querySelector('#showcustomerMenu'), 'click').subscribe(() => {
  //    this.elRef.nativeElement.querySelector('#modalcustomerMenu').style.display = "block";
  //    this.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
  //    this.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
  //    this.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
  //    this.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
  //    this.elRef.nativeElement.querySelector('form').classList.remove('active');
  //    this.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
  //  }),0)
  // }
  LoginCustSubmit() {
    const customer = {
      cUsername: this.usernameCustLog,
      cPassword: this.passwordCustLog,
    };
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.spinner.show();

        setTimeout(() => {

          this.elRef.nativeElement.querySelector('#modalLogCustomer').style.display = "none";
          this.spinner.hide();
        }, 1000);
        this.customerService.storeCustomerData(
          response.token,
          response.customer
        );
        //this.router.navigate(['']);
        this.ngAfterViewInit();

      } else {
          this.error_msg = "Invalid username or password!";
      }
    };
    const error = (response: any) => {this.error_msg = "Invalid username or password!";};

    this.customerService
      .authenticateCustomer(customer)
      .subscribe(success, error);
  }
  LoginRestauSubmit(){
    const restaurant = {
      rName: this.usernameRestauLog,
      rPassword: this.passwordRestauLog,
    };
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.restaurantService.storeRestaurantData(
          response.token,
          response.restaurant
        );
        this.ngAfterViewInit();
        this.elRef.nativeElement.querySelector('#modalLogRestaur').style.display = "none";

      } else {
          this.error_msg = "Invalid name or password!";
      }
    };
    const error = (response: any) => {this.error_msg = "Invalid name or password!";};
    this.restaurantService
      .authenticateRestaurant(restaurant)
      .subscribe(success, error);
  }
  LoginDelivSubmit(){
    const deliverer = {
      dUsername: this.usernameDelivLog,
      dPassword: this.passwordDelivLog,
    };
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.delivererService.storeDelivererData(
          response.token,
          response.deliverer
        );
        this.ngAfterViewInit();
        this.elRef.nativeElement.querySelector('#modalLogDeliver').style.display = "none";

      } else {
          this.error_msg = "Invalid name or password!";
      }
    };
    const error = (response: any) => {this.error_msg = "Invalid name or password! "};
    this.delivererService
      .authenticateDeliverer(deliverer)
      .subscribe(success, error);
  }
  LoginAdminSubmit(){
    const admin = {
      aUsername: this.usernameAdminLog,
      aPassword: this.passwordAdminLog,
    };
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.adminService.storeAdminData(
          response.token,
          response.admin
        );
        this.ngAfterViewInit();
        this.elRef.nativeElement.querySelector('#modalLogAdmin').style.display = "none";

      } else {
          this.error_msg = "Invalid name or password!";
      }
    };
    const error = (response: any) => {this.error_msg = "Invalid name or password! " };
    this.adminService
      .authenticateAdmin(admin)
      .subscribe(success, error);
  }

  onLogoutClick() {
    this.customerService.logOut();
    this.router.navigate(['']);
    this.ngAfterViewInit();
    this.elRef.nativeElement.querySelector('#modalcustomerMenu').style.display = "none";
    this.elRef.nativeElement.querySelector('#modalrestaurantMenu').style.display = "none";
    this.elRef.nativeElement.querySelector('#modaldelivererMenu').style.display = "none";
    this.elRef.nativeElement.querySelector('#modaladminMenu').style.display = "none";
    this.elRef.nativeElement.querySelector('#connectedId').style.display = "block";

    this.shared.changeQuantity("");
    this.shared.changeCardSource(null);
    return false;
  }
  RegistCustSubmit(){

      const customer = {
        cName: this.nameCustReg,
        cUsername: this.usernameCustReg,
        cPassword: this.passwordCustReg,
        cNumber: this.numberCustReg,
        cEmail: this.emailCustReg,
        cAdress: this.adressCustReg,
      };
      const onSuccess = (response: any) => {};
      const onError = (response: any) => {};
      try {
        if(this.nameCustReg==""|| this.usernameCustReg =="" || this.passwordCustReg =="" || this.numberCustReg =="" || this.emailCustReg =="" || this.adressCustReg ==""){
          this.error_msg = "Please, complete all fields!";
        }
        else{
          this.customerService.newCustomer(customer).subscribe(onSuccess, onError);
          this.spinner.show();
          this.error_msg = "";
          setTimeout(() => {
            this.elRef.nativeElement.querySelector('#modalRegiCustomer').style.display = "none";
            this.spinner.hide();
          }, 1000);
          this.router.navigate(['/']);
        }

      } catch (error) {this.error_msg = "Please, complete all fields!";}
  }
  showcustomerMenu(){
    var modalcustomerMenu = this.elRef.nativeElement.querySelector('#modalcustomerMenu');
    modalcustomerMenu.style.display = "block";
    this.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
     this.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
     this.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
     this.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
     this.elRef.nativeElement.querySelector('form').classList.remove('active');
     this.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
  }
  showCart(){
    var modalCard = this.elRef.nativeElement.querySelector('#modalCard');
    modalCard.style.display = "block";
    this.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
    this.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
    this.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
    this.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
    this.elRef.nativeElement.querySelector('form').classList.remove('active');
    this.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
    //console.log(this.shownFoodById("6246f8ac7ee07dad10c613e7"));
    if(this.listCardValueSecond){
      // console.log("avy shared "+this.listCardValueSecond.length);
      // /////averina avadika tableau
      // var listIdFoodOld :string[] = [];
      // for (let item of this.listCardValueSecond) {
      //   listIdFoodOld.push(item.oFood);
      // }
      // this.listIdFood=listIdFoodOld;
      // //console.log((this.listIdFood.toString()).split(','));
      // this.stringLId = this.listIdFood.toString();
      // console.log(this.stringLId);
      //console.log("shared =" +this.listCardValueSecond.length+" and localstrage "  + this.listCard.length);
    }
    else if(localStorage.getItem("cardFood")){
      this.listCard = JSON.parse(localStorage.getItem("cardFood")||"");
      // console.log("avy amin localStorage "+this.listCard)
      // for (let item of this.listCard) {
      //   this.listIdFood.push(item.oFood);
      // }
      // this.stringLId = this.listIdFood.toString();
      // console.log(this.stringLId);
      // //console.log((this.listIdFood.toString()).split(','));
      // //console.log("shared =" +this.listCardValueSecond.length+" and localstrage "  + this.listCard.length);
    }
    else{
      console.log("tsisy mints");
    }
    // if(stringLId){
    //   const success = (response: any) => {
    //
    //     if (response['status'] == 200) {
    //       this.listCardWName = response['datas'];
    //       this.listCardWName = this.listCardWName.map((item: any) => {
    //         item.show = true;
    //         return item;
    //       });
    //     } else {
    //       this.error_msg = response['message'];
    //     }
    //   };
    //   const error = (response: any) => {
    //   };
    //   this.foodService
    //     .showFoodByListId(stringLId)
    //     .subscribe(success, error);
    //
    // }
        // const success = (response: any) => {
        //
        //   if (response['status'] == 200) {
        //     this.listCardWName = response['datas'];
        //     this.listCardWName = this.listCardWName.map((item: any) => {
        //       item.show = true;
        //       return item;
        //     });
        //   } else {
        //     this.error_msg = response['message'];
        //   }
        // };
        // const error = (response: any) => {
        // };
        // this.foodService
        //   .showFoodByListId(this.stringLId)
        //   .subscribe(success, error);
        //   console.log(this.listCardWName);
  }
  deleteItemOnCard(oFood:string,quantity:number,price:number){

    var totalOrder = price*quantity;
    var oldQuantity = parseInt(localStorage.getItem("TotalQuantityCart") || "") ;
    var oldAmountTotal = parseInt(localStorage.getItem("AmountTotal") || "") ;
    //console.log(this.listCard);
    let actualListCard :any;
    if(this.listCardValueSecond){
      actualListCard =this.listCardValueSecond;
    }
    else{
      actualListCard =this.listCard;
    }


      for (let [i, item] of actualListCard.entries()) {
        if (item.oFood === oFood) {
          actualListCard.splice(i, 1); // Tim is now removed from "users"
        }
      }

      localStorage.setItem('TotalQuantityCart',String(oldQuantity-quantity) );
      localStorage.setItem('AmountTotal',String(oldAmountTotal-totalOrder));
      localStorage.setItem('cardFood',JSON.stringify(actualListCard));
      this.shared.changeQuantity(localStorage.getItem("TotalQuantityCart")  || "");
      this.shared.changeAmountTotalSource(localStorage.getItem("AmountTotal")  || "");
      this.shared.changeCardSource(JSON.parse(localStorage.getItem("cardFood")||"") );

    if(localStorage.getItem("TotalQuantityCart") && localStorage.getItem("TotalQuantityCart") ==="0"){
      this.listCard=null;
      this.quantityCard="";
      this.totalAmount="";
      localStorage.removeItem('cardFood');
      localStorage.removeItem('TotalQuantityCart');
      localStorage.removeItem('AmountTotal');
      this.shared.changeQuantity("");
      this.shared.changeAmountTotalSource("");
      this.shared.changeCardSource(null );
    }
  }
  valideOrder(){
    let actualUser = JSON.parse(localStorage.getItem("customer") || "")  ;
    let amount = "";
    let restaurantId ="";
    if(this.totalAmountValueSecond){
      amount=this.totalAmountValueSecond;
    }else{
      amount=this.totalAmount;
    }

    let actualListCard :any;
    if(this.listCardValueSecond){
      actualListCard =this.listCardValueSecond;
      restaurantId = actualListCard[0].idRestaurant;
    }
    else{
      actualListCard =this.listCard;
      restaurantId = actualListCard[0].idRestaurant;
    }
    const order = {
      allFoodOrdered: actualListCard,
      oRestaurant: restaurantId,
      oCustomer:actualUser.id,
      oAmount:amount
    };
    console.log(order);

    const onSuccess = (response: any) => {};
    const onError = (response: any) => {};
    try {
        this.orderService.newOrder(order).subscribe(onSuccess, onError);
        this.listCard=null;
        this.quantityCard="";
        this.totalAmount="";
        localStorage.removeItem('cardFood');
        localStorage.removeItem('TotalQuantityCart');
        localStorage.removeItem('AmountTotal');
        this.shared.changeQuantity("");
        this.shared.changeAmountTotalSource("");
        this.shared.changeCardSource(null );
        this.spinner.show();
        this.error_msg = "";
        setTimeout(() => {
          this.elRef.nativeElement.querySelector('#modalCard').style.display = "none";
          this.spinner.hide();
        }, 1000);
        this.router.navigate(['/']);
    } catch (error) {this.error_msg = "Please, complete all fields!";}



  }
}
