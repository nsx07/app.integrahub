import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Platform } from '@angular/cdk/platform';
import { MessageService } from '../../services/message.service';

@Component({
    selector: 'app-login',
    template: `
    <div id="login_page" class="w-screen h-screen z-[100] p-1 bg-gray-800 bg-opacity-50 bg-blend-darken">
      <div class="grid md:grid-cols-2 grid-cols-1 text-white rounded shadow bg-slate-950 h-full">
              <img src="assets/icons/logo_imagem_dark_mode.png" class="fixed w-12 m-6 z-10 rounded shadow-lg p-[1px] bg-opacity-10 bg-slate-700" alt="Icone AgendaHub"/>

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

                    <div class="relative">
                      <input type="text" formControlName="login" id="hs-floating-underline-input-email" class="peer py-4 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm placeholder:text-transparent focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2" placeholder="you@email.com">
                      <label for="hs-floating-underline-input-email" class="absolute top-0 start-0 py-4 px-0 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500">Email / Telefone</label>
                    </div>

                    <div class="relative">
                      <input type="password" formControlName="password" id="hs-floating-underline-input-passowrd" class="peer py-4 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm placeholder:text-transparent focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2" placeholder="********">
                      <label for="hs-floating-underline-input-passowrd" class="absolute top-0 start-0 py-4 px-0 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500">Senha</label>
                        <button type="button" data-hs-toggle-password='{
                          "target": "#hs-floating-underline-input-passowrd"
                        }' class="absolute top-3 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-none dark:focus:ring-none">
                        <svg class="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                          <path class="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                          <path class="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                          <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"/>
                          <path class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                          <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
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
    styleUrl: './login.component.scss',
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
