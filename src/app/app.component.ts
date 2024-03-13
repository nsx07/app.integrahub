import { Component } from "@angular/core";
import { skipRoutes } from "./core/rules";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-root",
  template: `
    <loader></loader>
    <p-toast [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }"></p-toast>

    <div id="app-container" class="w-screen h-screen overflow-auto dark:bg-primary backdrop-blur-lg bg-clean" [ngClass]="{ flex: sidebarFixed }">
      <div class="relative w-full md:h-full h-max overflow-auto" [ngClass]="{ 'sm:pl-14 pl-0 ': !hideNav }">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  constructor(
    private primeNG: PrimeNGConfig,
    private router: Router,
    private title: Title
  ) {

    primeNG.overlayOptions = {
      appendTo: "body",
    };

    title.setTitle("AgendaHub | Sistema de Gestão de Atividades");
  }

  get hideNav() {
    return skipRoutes.includes(location.pathname.replaceAll("/", ""));
  }

  get sidebarFixed() {
    return localStorage.getItem("sidebarFixed") === "true";
  }
}
