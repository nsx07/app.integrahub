import { Component, OnInit } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { GraphqlService } from "./services/graphql.service";
import { LoaderService } from "./services/loader.service";

@Component({
  selector: "app-root",
  template: `
    <loader></loader>
    <p-toast [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }"></p-toast>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {

  constructor(private apollo: GraphqlService, private load: LoaderService) {
  }
  
  ngOnInit() {
    this.apollo
      .get({
        query: gql`{
          users {
            items {
              id, name, email
            }
          }
        }`
      })
      .subscribe(console.log);
  }

}
