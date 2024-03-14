import { Component, OnInit } from "@angular/core";
import { skipRoutes } from "./core/rules";
import { Title } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  template: `
    <loader></loader>

    <div id="app-container" class="w-screen h-screen overflow-auto dark:bg-primary backdrop-blur-lg bg-clean">
      <app-sidebar></app-sidebar>
      <div class="relative w-full md:h-full h-max overflow-auto sm:pl-32 p-0">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private title: Title,
    private auth: AuthService
  ) {

    title.setTitle("AgendaHub | Sistema de Gestão de Atividades");
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);

        if (!this.auth.tokenIsValid) {
          this.router.navigate(["/login"]);
        } else if (event.url === "/login") {
          this.router.navigate(["/panel"]);
        }
      }
    });
  }

  get hideNav() {
    return skipRoutes.includes(location.pathname.replaceAll("/", ""));
  }

  get sidebarFixed() {
    return localStorage.getItem("sidebarFixed") === "true";
  }
}
