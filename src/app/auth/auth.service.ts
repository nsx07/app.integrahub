import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, finalize, map } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { StorageUtils } from '../utils/storage-utils';
import { MessageService } from 'primeng/api';
import { Platform } from '@angular/cdk/platform';
import { LoaderService } from '../services/loader.service';

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
    private platform: Platform,
    private messageService: MessageService
    ) 
    {
      
    }

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
    if (this.Token) {
      return this.jwt.decodeToken();
    }
    return null;
  }

  public getUserData() {
    return this.TokenData;
  }

  private get ExpiresIn() {
    if (this.Token) {
      return this.jwt.getTokenExpirationDate()
    }
    return null
  }

  public get IsValid() {
    const isValid = this.jwt.isTokenExpired(this.Token)
    
    return isValid
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
      
      if (r.token) {
        this.checkToken();
      }

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

  public back (navigate?: NavigateOptions) {
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

  interval: any
  
  private get intervalRunning() {
    return StorageUtils.getLocalItem("interval")
  }

  private set intervalRunning(value: boolean) {
    StorageUtils.setLocalItem("interval", value);
  }

  private checkToken() {
    clearInterval(this.interval)
    this.intervalRunning = true;

    this.interval = setInterval(async () => {
      const now = Date.now();
      const timeRemaining = await this.ExpiresIn;

      if (!timeRemaining) {
        clearInterval(this.interval);
        this.intervalRunning = false;
      }

      const isNeedRefresh = Math.abs(timeRemaining?.getTime()! - now) / 1000 < 100;

      if (this.isLogged && isNeedRefresh) {
        clearInterval(this.interval);
        this.intervalRunning = false;
        this.tryRefreshToken()
      }

      if (!this.isLogged) {
        clearInterval(this.interval)
        this.intervalRunning = false;
      }
    }, 1000);
  }

  private tryRefreshToken() {
    console.log("Token its auto-refresh only on mobile");
    if (!this.platform.isBrowser || this.platform.ANDROID || this.platform.IOS) {

      console.log("Trying to refresh token");
      this.httpClient.get(this.baseUrl + "Auth/Refresh").subscribe((x: any) => {
        console.log(x);
        
        if (x && x.token) {
          console.log("Token refreshed");
          this.Token = x.token;
          
          this.checkToken()
        }
      }, err => {
        this.back({beforeNavigate: () => this.messageService.add({severity: "warning", summary: "Erro ao atualizar token", detail: err})})
      })
    }
  }

}

export class NavigateOptions {
  timeout? = 456;
  target?: string
  beforeNavigate?: () => void;
  afterNavigate?: () => void;
  prompt?: Promise<boolean>
}