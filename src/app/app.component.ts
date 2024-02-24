import { Component, OnInit } from "@angular/core";
import { Apollo, gql } from "apollo-angular";

@Component({
  selector: "app-root",
  template: `
    <div class="w-screen h-screen flex justify-center items-center bg-primary">
      <div class="p-2 flex flex-col justify-center items-center text-white">
        <div class="max-w-80">
          <img
            src="https://storage.agendahub.app/wwwroot/logos-agendahub/logo_texto_imagem.png"
            alt="agendahub logo"
            loading="eager"
          />
        </div>
        <div class="snippet" data-title="dot-flashing">
          <div class="stage">
            <div class="dot-flashing"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = "integrahub";

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    console.log('init');
    
    this.apollo
      .query({
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
