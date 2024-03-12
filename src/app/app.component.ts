import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <loader></loader>
    <p-toast [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }"></p-toast>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {

  constructor() { }

}
