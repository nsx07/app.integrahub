import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, finalize, map } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { StorageUtils } from '../utils/storage-utils';
import { Platform } from '@angular/cdk/platform';
import { LoaderService } from '../services/loader.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = false;
  private baseUrl = environment.apiUrl;
  public tokenIsValid = new Subject<boolean>();

  constructor(
    private router: Router,
    private loader: LoaderService,
    private jwt: JwtHelperService,
    private httpClient: HttpClient,
    private messageService: MessageService
    ) 
    { }

  public get isLogged () {
    this.logged = this.TokenData != null;
    return this.logged;
  }

  public get Token() {
    return StorageUtils.getLocalItem("token");
  }

  public set Token(token: any) {

    if (!token) {
      this.logged = false
    } else {
      this.logged = true
    }

    StorageUtils.setLocalItem("token", token);
  }

  public get TokenData() {
    return this.Token ?? this.jwt.decodeToken();
  }

  public getUserData() {
    return this.TokenData;
  }

  private get ExpiresIn() {
    return this.Token ?? this.jwt.getTokenExpirationDate()
  }

  public get IsValid() {
    return this.jwt.isTokenExpired(this.Token)
  }
  
  public login(login: string, password: string, extras?: Record<string, any>) {
    const loginModel = {
      login: login,
      password: password
    }

    this.loader.show()
    console.log(extras);
    

    return this.httpClient.post(this.baseUrl + "Auth/Login", loginModel, extras ? {params: extras} : undefined).pipe(finalize(() => this.loader.hide())).pipe(map((r: any) => {
      this.Token = r.token;
      
      return r
    }))
  }

  public logout(fnLogout = () => this.messageService.add({severity: "info", summary: "Até breve..."})) {
    this.Token = null;

    this.back({
      beforeNavigate: fnLogout,
      timeout: 1000
    })
  }

  public back(navigate?: NavigateOptions) {
    if (navigate && navigate.beforeNavigate) {
      navigate.beforeNavigate()
    }

    setTimeout(() => {
      this.router.navigate(['login']);
      if (navigate && navigate.afterNavigate) {
        navigate.afterNavigate();
      }
    }, navigate ? navigate.timeout : 456);

    return false;
  }

  public goFourth(navigate: NavigateOptions) {
    if (navigate.beforeNavigate) {
      navigate.beforeNavigate()
    }
    setTimeout(() => {
      if (navigate.target) {
        this.router.navigate([navigate.target]);
      }

      if (navigate.afterNavigate) {
        navigate.afterNavigate();
      }
    }, navigate.timeout);
  }

}

export class NavigateOptions {
  timeout? = 456;
  target?: string
  beforeNavigate?: () => void;
  afterNavigate?: () => void;
  prompt?: Promise<boolean>
}