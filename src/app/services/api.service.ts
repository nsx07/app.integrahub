import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { LoaderService } from './loader.service';
import { finalize, map, catchError, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MessageService } from './message.service';
import { ErrorHandler } from '../utils/error';

export type QueryParams = Record<string, string | number | boolean | ReadonlyArray<string | number | boolean > | Array<number|string>>;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private loader: LoaderService, private auth: AuthService, private messageService: MessageService) { }

  public get raw() {
    return this.httpClient;
  };

  public requestFromApi<T = any>(endpoint: string, params: QueryParams | null = null, load = true) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    load && this.loader.show()

    return this.httpClient.get<T>(apiUrl, params ? {params: params} : undefined).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      load && this.loader.hide();
      return result;
    }), catchError(err => {
      ErrorHandler.templateError(err, this.messageService, this.auth);
      throw err;
    }));
  }

  public sendToApi<T = any, R = any>(endpoint: string, body: T, load = true) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    load && this.loader.show()

    return this.httpClient.post<R>(apiUrl, body).pipe(take(1)).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      load && this.loader.hide();
      return result;
    }), catchError(err => {
      ErrorHandler.templateError(err, this.messageService, this.auth);
      throw err;
    }));
  }

  public updateToApi(endpoint: string, body?: any, params: QueryParams|null = null, load = true) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    load && this.loader.show()

    return this.httpClient.put(apiUrl, body, params ? {params: params}: undefined).pipe(take(1)).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      load && this.loader.hide();
      return result;
    }), catchError(err => {
      ErrorHandler.templateError(err, this.messageService, this.auth);
      throw err;
    }));
  }

  public deleteFromApi(endpoint: string, params?: any, load = true) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    load && this.loader.show()

    return this.httpClient.delete(apiUrl, params ? {params: params} : undefined).pipe(take(1)).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      load && this.loader.hide();
      return result;
    }), catchError(err => {
      ErrorHandler.templateError(err, this.messageService, this.auth);
      throw err;
    }));
  }

}
