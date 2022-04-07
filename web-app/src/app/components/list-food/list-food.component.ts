import { AfterViewInit,Component, OnInit ,ElementRef,HostListener,ViewChildren,QueryList,Injectable} from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { fromEvent, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodService } from '../../services/food.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedService } from '../../services/shared.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css'],
})
@Injectable({
  providedIn: 'root' // just before your class
})
export class ListFoodComponent implements AfterViewInit {


  quantitySrc: Subject<string>;
  listCardSrc: Subject<any>;

  idRestaurant = '';
  restaurant: any;
  list_food_res: any = [];
  foodSelected:any;
  quantity=1;
  i=1;
  usernameCustLog: string = '';
  passwordCustLog: string = '';
  error_msg:string = '';
    clickedElement: Subscription = new Subscription();
// @ViewChildren('inputTag') inputTag!: QueryList<any>;
// name = 'Angular';
//
// @ViewChildren('buttonTag') buttonTag!: QueryList<any>;
//
// add() {
//    console.log(this.inputTag);
//    this.inputTag.map((tag) => {
//      //console.log(tag.nativeElement.value);
//      if(tag.nativeElement.value !== '') {
//        console.log(tag.nativeElement.id);
//      }
//    })
//  }

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  if (event.target == this.elRef.nativeElement.querySelector('#modalFoodCommand') ||
      event.target == this.elRef.nativeElement.querySelector('#modalNotAccess') ||
      event.target == this.elRef.nativeElement.querySelector('#modalLogCustomer')
    ) {
    this.quantity =1;
    this.i=1;
    this.elRef.nativeElement.querySelector('#modalFoodCommand').style.display = "none";
    this.elRef.nativeElement.querySelector('#modalNotAccess').style.display = "none";
    this.elRef.nativeElement.querySelector('#modalLogCustomer').style.display = "none";
  }
}
  constructor(
    private elRef: ElementRef,
    private navBar :NavbarComponent,
    private customerService: CustomerService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private foodService: FoodService,
    private shared: SharedService
  ) {
    this.quantitySrc = this.shared.quantitySource;
    this.listCardSrc = this.shared.listCardSource;
  }

  ngAfterViewInit(): void {
  //   console.log(this.buttonTag.length);
  //   this.buttonTag.map((tag) => {
  //     console.log(tag);
  //     this.clickedElement = fromEvent(tag.nativeElement.id, 'click').subscribe(() => {
  //       console.log("ok");
  //     });
  //   })
  //   //console.log(this.buttonTag._results);
  // //  console.log(this..get(0).nativeElement.id);
  //   this.buttonTag.map((tag) => {
  //     //console.log(tag.nativeElement.value);
  //       console.log(tag.nativeElement.id);
  //
  //   })
    const allParams = this.activatedRoute.snapshot.params;
    setTimeout(()=>
    this.activatedRoute.paramMap.subscribe((x) => {
      let idRestaurant = x.get('id');
      this.showRestaurantById(idRestaurant);
      this.showAllFoodByRestaurant(idRestaurant);
    })
    ,0);
    //var buy = ;
    //console.log(this.elRef.nativeElement.querySelector("#wave1"));
  }

  showRestaurantById(idRestaurant: any) {
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.restaurant = response['datas'];
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


  showFoodCommand(id :string){

    if(localStorage.getItem("customer")){
      const success = (response: any) => {
        if (response['status'] == 200) {
          this.foodSelected = response['datas'];
        } else {
          //this.error_msg = response['message'];
        }
      };
      const error = (response: any) => {
        //this.error_msg = 'Erreur connexion';
      };
      this.foodService.showFoodById(id).subscribe(success, error);
      setTimeout(()=>{
        var modalFoodCommand = this.elRef.nativeElement.querySelector('#modalFoodCommand');
        modalFoodCommand.style.display = "block";
      },0)
    }
    if(localStorage.getItem("admin") || localStorage.getItem("deliverer") || localStorage.getItem("restaurant")){
        var modalNotAccess= this.elRef.nativeElement.querySelector('#modalNotAccess');
        modalNotAccess.style.display = "block";
    }
    if(!localStorage.getItem("id_token")){
        var modalLogCustomer= this.elRef.nativeElement.querySelector('#modalLogCustomer');
        modalLogCustomer.style.display = "block";
        //modalNotAccess.style.display = "block";
    }
  }

  plus(){
    this.i++;
    this.quantity=this.i;
  }
  minus(){
    if(this.i !=1){
      this.i--;
      this.quantity=this.i;
    }
  }
  addFoodToCard(idFood:string,priceFood:any,quantity:number ){

    console.log(idFood + " " + priceFood + " " + quantity);
    var newOrder = '{"oFood" :"'+idFood+'", "quantitiy" :"'+quantity+'"}'
    var totalOrder = priceFood*quantity;
    if(!localStorage.getItem("cardFood")){
      localStorage.setItem('TotalQuantityCart',String(quantity));
      localStorage.setItem('cardFood', newOrder);
      console.log("vaovao "+ localStorage.getItem("cardFood"));
    }else{
      var oldOrder = localStorage.getItem("cardFood");
      var oldQuantity = parseInt(localStorage.getItem("TotalQuantityCart") || "") ;
      localStorage.setItem('cardFood',oldOrder+","+newOrder);
      localStorage.setItem('TotalQuantityCart',String(oldQuantity+quantity) );
      console.log("efa nisy "+ localStorage.getItem("cardFood"));
      var array =JSON.parse("["+localStorage.getItem("cardFood")+"]") ;
      //if connect zay vo afaka miajouter panier
      //var result = array.filter(function(el:any){return el.oFood == "6246f8377ee07dad10c613e3"}).quantitiy
      //console.log(result);
      //console.log(JSON.parse("["+localStorage.getItem("cardFood")+"]") );
    }
      this.navBar.quantityCard = localStorage.getItem("TotalQuantityCart")  || "";

      this.quantity=1;
      this.i =1;
      //this.reloadCurrentRoute()
      //this.router.navigate(['']);
      var modalFoodCommand = this.elRef.nativeElement.querySelector('#modalFoodCommand');
      modalFoodCommand.style.display = "none";
      this.shared.changeQuantity(localStorage.getItem("TotalQuantityCart")  || "");
      this.shared.changeCardSource(JSON.parse("["+localStorage.getItem("cardFood")+"]") );
  }

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
        }, 5000);
        this.customerService.storeCustomerData(
          response.token,
          response.customer
        );
        //this.router.navigate(['nav-bar']);
        //this.router.navigate(['']);
        //this.ngAfterViewInit();
        //this.navBar.test();
       //  setTimeout(()=>this.navBar.clickedElement =  fromEvent(this.navBar.elRef.nativeElement.querySelector('#showcustomerMenu'), 'click').subscribe(() => {
       //   this.navBar.elRef.nativeElement.querySelector('#modalcustomerMenu').style.display = "block";
       //   this.navBar.elRef.nativeElement.querySelector('.nav-items').classList.remove('active');
       //   this.navBar.elRef.nativeElement.querySelector('.menu-icon span').classList.remove('hide');
       //   this.navBar.elRef.nativeElement.querySelector('.search-icon').classList.remove('hide');
       //   this.navBar.elRef.nativeElement.querySelector('.cancel-icon').classList.remove('show');
       //   this.navBar.elRef.nativeElement.querySelector('form').classList.remove('active');
       //   this.navBar.elRef.nativeElement.querySelector('.cancel-icon').style.color = '#ff3d00';
       // }),0)
      } else {
          this.error_msg = "Invalid username or password!";
      }
    };
    const error = (response: any) => {this.error_msg = "Invalid username or password!";};

    this.customerService
      .authenticateCustomer(customer)
      .subscribe(success, error);
  }
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
