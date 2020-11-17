import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlsService } from '../core/urls.service';
import { CoreService } from '../core/core.service';
import { CustomHttpParamEncoder } from "../core/custom-http-param-encoder";
import "rxjs/add/operator/timeout";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public httpOptions: any;
  public connID: string;
  public baseUrl: string;
  public httpTimeout: number;

  constructor(
    private urlService: UrlsService,
    private http: HttpClient,
    private core: CoreService) {

    this.httpOptions = this.core.httpOptions;
    this.baseUrl = `${this.urlService.baseUrl}`;
    this.httpTimeout = this.core.httpTimeout;
  }

  /* *
   *       USERS
   * ************************************************************************************************/
  /** GET: fetch the details of a user*/
  getAllUsers(): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/users`;

      return new Promise((resolve, reject) => {
        this.http.get<any>(url)
          .timeout(this.httpTimeout)
          .subscribe(
            (data: any) => {
              if (data.status != 'error') {
                resolve(data);
              } else {
                reject(data);
              }
            },
            (error: any) => {
              reject(error);
            });
      });
    } else {
      return this.core.fakePromise('error', 'Sorry, you\'re not allowed to do this!');
    }
  }

  getAllMedicals(): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/medicals`;

      return new Promise((resolve, reject) => {
        this.http.get<any>(url)
          .timeout(this.httpTimeout)
          .subscribe(
            (data: any) => {
              if (data.status != 'error') {
                resolve(data);
              } else {
                reject(data);
              }
            },
            (error: any) => {
              reject(error);
            });
      });
    } else {
      return this.core.fakePromise('error', 'Sorry, you\'re not allowed to do this!');
    }
  }


  /** GET: fetch the details of a user*/
  getUser(id): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/user`;

      if (!this.core.isEmptyOrNull(id)) {
        url += `/${encodeURIComponent(id)}`;
      }

      return new Promise((resolve, reject) => {
        this.http.get<any>(url)
          .timeout(this.httpTimeout)
          .subscribe(
            (data: any) => {
              if (data.status != 'error') {
                resolve(data);
              } else {
                reject(data);
              }
            },
            (error: any) => {
              reject(error);
            });
      });
    } else {
      return this.core.fakePromise('error', 'Sorry, you\'re not allowed to do this!');
    }
  }

  /** GET: fetch the details of a user*/
  getUserByToken(): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/user`;

      return new Promise((resolve, reject) => {
        this.http.get<any>(url)
          .timeout(this.httpTimeout)
          .subscribe(
            (data: any) => {
              if (data.status != 'error') {
                resolve(data);
              } else {
                reject(data);
              }
            },
            (error: any) => {
              reject(error);
            });
      });
    } else {
      return this.core.fakePromise('error', 'Sorry, you\'re not allowed to do this!');
    }
  }

  /** POST: update user info */
  updateUser(dataObject): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/userupdate`;

      let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });


      if (!this.core.isEmptyOrNull(dataObject.email)) {
        params = params.set('email', dataObject.email);
      }

      if (!this.core.isEmptyOrNull(dataObject.firstname)) {
        params = params.set('firstname', dataObject.firstname);
      }

      if (!this.core.isEmptyOrNull(dataObject.lastname)) {
        params = params.set('lastname', dataObject.lastname);
      }

      if (!this.core.isEmptyOrNull(dataObject.username)) {
        params = params.set('username', dataObject.username);
      }

      if (!this.core.isEmptyOrNull(dataObject.phone)) {
        params = params.set('phone', dataObject.phone);
      }

      // console.log('the params........................', params); return;

      return new Promise((resolve, reject) => {
        this.http.put<any>(url, params, this.httpOptions)
          .timeout(this.httpTimeout)
          .subscribe(
            (data: any) => {
              if (data.status != 'error') {
                resolve(data);
              } else {
                reject(data);
              }
            },
            (error: any) => {
              reject(error);
            });
      });
    } else {
      return this.core.fakePromise('error', 'Sorry, you\'re not allowed to do this!');
    }
  }


  deleteUser(id): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/userdelete`;


      if (!this.core.isEmptyOrNull(id)) {
        url += `/${encodeURIComponent(id)}`;
      }

      return new Promise((resolve, reject) => {
        this.http.delete<any>(url, this.httpOptions)
          .timeout(this.httpTimeout)
          .subscribe(
            (data: any) => {
              if (data.status != 'error') {
                resolve(data);
              } else {
                reject(data);
              }
            },
            (error: any) => {
              reject(error);
            });
      });
    } else {
      return this.core.fakePromise('error', 'Sorry, you\'re not allowed to do this!');
    }
  }


}
