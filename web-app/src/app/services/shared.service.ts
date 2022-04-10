import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor() { }

  _quantity: string = "";

  _quatitySource: Subject<string> = new Subject();

  get quantitySource(): Subject<string> {
    return this._quatitySource;
  }

  set quantitySource(src: Subject<string>) {
    this._quatitySource = src;
  }

  changeQuantity(n: string) {
    this.quantitySource.next(n);
  }

  _listCard: any;

  _listCardSource: Subject<any> = new Subject();

  get listCardSource(): Subject<any>{
    return this._listCardSource;
  }

  set listCardSource(src: Subject<any>){
    this._listCardSource = src;
  }

  changeCardSource(n : any){
    this.listCardSource.next(n);
  }

  _amountTotal: string ="";

  _amountTotalSource: Subject<string> = new Subject();

  get amountTotalSource(): Subject<string>{
    return this._amountTotalSource;
  }

  set amountTotalSource(src: Subject<string>){
    this._amountTotalSource = src;
  }

  changeAmountTotalSource(n : string){
    this.amountTotalSource.next(n);
  }



    _listFinishedResto: any;

    _listFinishedRestoSource: Subject<any> = new Subject();

    get listFinishedRestoSource(): Subject<any>{
      return this._listFinishedRestoSource;
    }

    set listFinishedRestoSource(src: Subject<any>){
      this._listFinishedRestoSource = src;
    }

    changelistFinishedRestoSource(n : any){
      this.listFinishedRestoSource.next(n);
    }
//////////////////////////////
    _listNotPreparedResto: any;

    _listNotPreparedRestoSource: Subject<any> = new Subject();

    get listNotPreparedRestoSource(): Subject<any>{
      return this._listNotPreparedRestoSource;
    }

    set listNotPreparedRestoSource(src: Subject<any>){
      this._listNotPreparedRestoSource = src;
    }

    changelistNotPreparedRestoSource(n : any){
      this.listNotPreparedRestoSource.next(n);
    }
}
