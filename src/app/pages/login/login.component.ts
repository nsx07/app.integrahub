import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { Platform } from '@angular/cdk/platform';

@Component({
    selector: 'app-login',
    template: `
    <div id="login_page" class="w-screen h-screen z-[100] p-2 bg-gray-500">
      <div class="grid md:grid-cols-2 grid-cols-1 text-white rounded shadow bg-slate-950 h-full">
              <img src="assets/icons/logo_imagem_dark_mode.png" class="fixed w-12 m-6 z-10 rounded" alt="Icone AgendaHub"/>

              <div class="bg-blend-darken h-full overflow-hidden md:block hidden rounded-l">
                <img loading="eager" [src]="image" class="opacity-60 w-full object-cover object-center h-full" style="zoom: -50%" alt="landscape"/>
              </div>

              <div class="flex justify-center items-center h-full bg-opacity-70 rounded-r">
                <div class="sm:mx-auto sm:w-80 w-90% sm:max-w-sm">
                    <div class="justify-center flex mb-10">
                    <img
                        class="w-60 sm:w-80 self-center"
                        src="assets/icons/logo_texto.png"
                        alt="Logo AgendaHub"
                    />
                    </div>

                    <form
                    [formGroup]="loginForm"
                    id="form-login-page"
                    class="flex flex-col gap-4 my-6"
                    >
                    <div>
                        <label
                        for="login"
                        class="text-left text-base sm:text-sm font-normal leading-9 tracking-normal text-gray-400"
                        >Email ou Telefone</label
                        >
                        <input
                        formControlName="login"
                        type="text"
                        id="login"
                        class="input w-full"
                        />
                    </div>

                    <div>
                        <label
                        for="password"
                        class="text-left text-base sm:text-sm font-normal leading-9 tracking-normal text-gray-400"
                        >Senha</label
                        >
                        <input
                        id="password"
                        formControlName="password"
                        type="password"
                        autocomplete="current-password"
                        class="input w-full"
                        />
                    </div>

                    <div class="mt-5">
                        <button
                        (click)="login()"
                        form="form-login-page"
                        type="submit"
                        class="w-full text-white bg-[#380e76] hover:bg-[#2e2d63] focus:ring-4 focus:ring-[#f0ece5] font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-[#380e76] dark:hover:bg-[blue-700] focus:outline-none dark:focus:ring-[#2e2d63]"
                        >
                        <span class="flex w-full justify-center items-center text-sm">
                            Continuar <i class="fa-solid fa-arrow-right ml-2"></i>
                        </span>
                        </button>
                    </div>
                    </form>
                </div>
              </div>
      </div>
      
    </div>
    `,
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    image! : string;
  
    constructor(@Inject(DOCUMENT) private document: Document,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
                private platform: Platform) {
      this.loginForm = this.formBuilder.group({
        login: ["", Validators.required],
        password: ["", Validators.required]
      });
  
    }
  
    ngOnInit(): void {
      this.image = this.getRandomImage();
    }
  
    get isMobile() {
      return this.platform.ANDROID || this.platform.IOS;
    }
    
    login() {
      const form = structuredClone(this.loginForm.value);

      console.log(form);
      
  
      this.authService.login(form.login, form.password, {isMobile: this.isMobile}).subscribe({
        next: (result: any) => {
          
          if (result.success) {
            this.authService.goFourth({
              target: "home",
              beforeNavigate: () => this.messageService.add({severity: "success", summary: "Logado com sucesso!", detail: result.message})
            })
            
          } else {
            console.log(result);
            this.messageService.add({severity: "error", summary: "Erro ao logar!", detail: result.message})
          }
        }, error: (err: any) => {
          this.messageService.add({severity: "error", summary: "Erro ao logar!", detail: err.message})
        }
      });
    }
  
    getRandomImage() {
      const thisPage = this.document.querySelector("#login_page") as HTMLElement;
      const [width, height] = [thisPage.clientWidth - 200, thisPage.clientHeight];
      
      return `https://source.unsplash.com/random/${height}x${width}/?landscape?grayscale`;
    }
  }
