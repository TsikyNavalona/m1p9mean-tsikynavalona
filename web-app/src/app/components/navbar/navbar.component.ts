import { AfterViewInit, Component, OnInit, ElementRef,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  usernameCustLog: string = '';
  passwordCustLog: string = '';

  usernameRestauLog: string = '';
  passwordRestauLog: string = '';

  error_msg:string = '';
  constructor(private elRef: ElementRef,
  private customerService: CustomerService,
  private restaurantService: RestaurantService,
  private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    } ;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == this.elRef.nativeElement.querySelector('#modalCard') ||
    event.target == this.elRef.nativeElement.querySelector('#modalLoginChoice') ||
    event.target == this.elRef.nativeElement.querySelector('#modalLogCustomer')  ||
    event.target == this.elRef.nativeElement.querySelector('#modalLogRestaur')  ||
    event.target == this.elRef.nativeElement.querySelector('#modalLogDeliver')  ||
    event.target == this.elRef.nativeElement.querySelector('#modalLogAdmin')  ||
    event.target == this.elRef.nativeElement.querySelector('#modalRegiCustomer')   ) {
      this.error_msg ='';
      this.elRef.nativeElement.querySelector('#modalCard').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLoginChoice').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLogCustomer').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLogRestaur').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLogDeliver').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalLogAdmin').style.display = "none";
      this.elRef.nativeElement.querySelector('#modalRegiCustomer').style.display = "none";
    }
  }
  clickedElement: Subscription = new Subscription();
  ngAfterViewInit() {}

  ngOnInit(): void {
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

    this.clickedElement = fromEvent(showCart, 'click').subscribe(() => {
      modalCard.style.display = "block";
      nav.classList.remove('active');
      menu.classList.remove('hide');
      search.classList.remove('hide');
      cancel.classList.remove('show');
      form.classList.remove('active');
      cancel.style.color = '#ff3d00';
    });

    this.clickedElement = fromEvent(closeCard, 'click').subscribe(() => {
      modalCard.style.display = "none";
    });

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




  }
  LoginCustSubmit() {
    const customer = {
      cUsername: this.usernameCustLog,
      cPassword: this.passwordCustLog,
    };
    const success = (response: any) => {
      if (response['status'] == 200) {
        this.customerService.storeCustomerData(
          response.token,
          response.customer
        );
        this.router.navigateByUrl('');
        this.elRef.nativeElement.querySelector('#modalLogCustomer').style.display = "none";
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
        this.router.navigateByUrl('');
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
}
