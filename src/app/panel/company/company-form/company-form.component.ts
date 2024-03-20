import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../../services/graphql.service';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, firstValueFrom, of, timeout } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { Reactor } from '../../../utils/reactor';
import { Observable } from '@apollo/client';

@Component({
  selector: 'app-company-form',
  template: `
    <!-- Hire Us -->
    <div class="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="max-w-xl mx-auto">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Empresa
          </h1>
          
        </div>

        <div class="sm:mt-12 mt-4">
          <!-- Form -->
          <form [formGroup]="form" id="companyForm">
            <div class="grid gap-4 lg:gap-6">
              <!-- Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label for="fullName" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Nome Completo</label>
                  <input type="text" name="fullName" formControlName="fullName" id="fullName" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                </div>

                <div>
                  <label for="domainName" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Nome domínio</label>
                  <input type="text" name="domainName" formControlName="domainName" id="domainName" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                </div>
              </div>
              <!-- End Grid -->

              
              <!-- Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label for="email" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Email</label>
                  <input type="email" name="email" formControlName="email" id="email" autocomplete="email" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                </div>
                <div>
                  <label for="phone" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Telefone</label>
                  <input type="text" name="phone" formControlName="phone" id="phone" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                </div>
              </div>
              <!-- End Grid -->

              <!-- Grid -->
              <div class="flex w-full gap-2 lg:gap-4">
                <div class="w-[8rem]">
                  <label for="zipCode" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">CEP</label>
                  <input name="zipCode" formControlName="zipCode" id="zipCode" (keyup)="findCep()" autocomplete="zipCode" class="py-3 px-2 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                </div>
                <div class="w-full">
                  <label for="address" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Endereço</label>
                  <input type="text" name="address" formControlName="address" id="address" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                </div>
                <div class="w-[6rem]">
                  <label for="number" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Num.</label>
                  <input name="number" formControlName="number" id="number" autocomplete="zipCode" class="py-3 px-2 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                </div>
              </div>
              <!-- End Grid -->

              <!-- Grid -->
              <div class="grid grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label for="state" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Estado</label>
                  <select formControlName="state" (change)="onStateSelect($event)" class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                    <option selected>Selecione o estado</option>
                    @for (state of states; track state.id) {
                      <option [value]="state.id">{{state.sigla}} - {{state.nome}}</option>
                    } @empty {
                      <option>Carregando...</option>
                    }
                  </select>
                </div>
                <div>
                  <label for="city" class="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Cidade</label>
                  <select formControlName="city" class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                    <option selected>Selecione a cidade</option>
                    @for (city of cities; track city.id) {
                      <option [value]="city.id">{{city.nome}}</option>
                    } @empty {
                      <option>Carregando...</option>
                    }
                  </select>
                </div>
              </div>
              <!-- End Grid -->

              <div class="flex justify-between sm:flex-row flex-col w-full py-2 gap-4 lg:gap-6">
                <div>
                  <label class="block">
                    <span class="sr-only">Escolher logo</span>
                    <input formControlName="logo" type="file" (change)="file($event)" class="block w-full text-sm text-gray-500
                      file:me-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-600 file:text-white
                      hover:file:bg-blue-700
                      file:disabled:opacity-50 file:disabled:pointer-events-none
                      dark:file:bg-blue-500
                      dark:hover:file:bg-blue-400
                    ">
                  </label>
                </div>
                <div>
                  <label for="isActive" class="flex items-center">
                    <div class="flex mb-[2px]">
                      <input id="isActive" formControlName="isActive" name="isActive" type="checkbox" class="shrink-0 mt-1.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                    </div>
                    <div class="ms-2">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Ativo</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>
            <!-- End Grid -->

            <!-- Checkbox -->
            
            <!-- End Checkbox -->

            <div class="mt-6 flex gap-6 justify-between">
              <button (click)="router.navigate(['/panel/company/'])" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-coolGray-600 text-white hover:bg-coolGray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 invalid:border-red-500">Voltar</button>
              <button type="submit" (click)="save()" [disabled]="form.invalid" form="companyForm" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 invalid:border-red-500">Cadastrar empresa</button>
            </div>

            <!-- <div class="mt-3 text-center">
              <p class="text-sm text-gray-500">
                We'll get back to you in 1-2 business days.
              </p>
            </div> -->
          </form>
          <!-- End Form -->
        </div>
      </div>
    </div>
    <!-- End Hire Us -->
  `,
  styles: ``
})
export class CompanyFormComponent implements OnInit{

  baseUrlApiGeo = 'https://servicodados.ibge.gov.br/api/v1/localidades/'
  baseCep = "https://opencep.com/v1/"
  regExp = new RegExp('^[0-9]{5}-?[0-9]{3}$');
  
  company: any;
  form!: FormGroup;
  states: any[] = []
  cities: any[] = []
  companyId?: number

  constructor(private graphql: GraphqlService, private api: ApiService, private formBuilder: FormBuilder, private activedRoute: ActivatedRoute, private loader: LoaderService,public router: Router) { }
  
  ngOnInit(): void {
    this.getIdfromUrl();
    this.createForm();
    this.loadResources();
  }

  getIdfromUrl() {
    const id = this.activedRoute.snapshot.params['id'];
    this.companyId = Number(+id) ? +id : undefined;
    console.log(this.companyId);
    
  }

  get() {
    
    this.graphql.get(`{
      companies(where: {id: {eq: ${this.companyId}}}) {
          items {
            id, fullName,domainName, zipCode, state, city, isActive, email, phone, address, logoUrl
          }
      }
  }`).subscribe((result) => {
      this.company = result.data.companies.items[0];
      console.log(this.company);
      this.form.patchValue(this.company);
      this.loader.hide();
    });
  }

  async onStateSelect(event: any) {
    const stateId = event.target.value;
    this.cities = await firstValueFrom(this.api.raw.get<any[]>(this.baseUrlApiGeo + 'estados/' + stateId + '/municipios'))

  }

  async loadResources() {
    this.loader.show();
    
    this.states = await firstValueFrom(this.api.raw.get<any[]>(this.baseUrlApiGeo + 'estados'))

    if(this.companyId) {
      this.get();
    } else
      this.loader.hide();
  }

  createForm() {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      domainName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      number: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(this.regExp)]],
      isActive: [true],
      logo: [],
    });
  }

  findCep() {
    const cep = this.form.get('zipCode')?.value;
    
    if(cep && this.regExp.test(cep)) {
      this.api.raw.get<any>(this.baseCep + cep.replace("-", "")).subscribe((data) => {
        this.form.get('address')?.setValue(data.logradouro);

        const state = this.states.find((state) => state.sigla == data.uf);
        this.onStateSelect({target: {value: state.id}})
         .then(() => {
            const city = this.cities.find((city) => city.nome == data.localidade)
            this.form.get('city')?.setValue(city.id);
         });

        this.form.get('state')?.setValue(state.id);
        
      });
    }
  }

  file(event: any) {
    console.log(event.target.files[0]);
  }

  save() {
    const data = this.form.value;
    
    data.city = this.cities.find((city) => city.id == data.city).nome;
    data.state = this.states.find((state) => state.id == data.state).nome;

    console.log(data);

    this.api.sendToApi("company", this.form.value).subscribe((data) => {
      console.log(data);
    });
  }

}
