import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'E-Kaly';
  //myScriptElement: HTMLScriptElement;

  constructor() {
    // this.myScriptElement = document.createElement('script');
    // this.myScriptElement.src = 'src/nav.js';
    // document.body.appendChild(this.myScriptElement);
  }
}
