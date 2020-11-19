import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlsService } from '../core/urls.service';
import { CoreService } from '../core/core.service';
import { CustomHttpParamEncoder } from "../core/custom-http-param-encoder";
import "rxjs/add/operator/timeout";
import { letProto } from 'rxjs-compat/operator/let';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

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

  /** GET: fetch the details of a request*/
  addRequest(dataObject): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/request`;
      let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });

      // These parameters are always passed

      // These parameters are only passed if not empty or null
      if (!this.core.isEmptyOrNull(dataObject.name)) {
        params = params.set('name', dataObject.name);
      }

      if (!this.core.isEmptyOrNull(dataObject.section)) {
        params = params.set('section', dataObject.section);
      }

      if (!this.core.isEmptyOrNull(dataObject.email)) {
        params = params.set('email', dataObject.email);
      }

      if (!this.core.isEmptyOrNull(dataObject.phone)) {
        params = params.set('phone', dataObject.phone);
      }

      if (!this.core.isEmptyOrNull(dataObject.user)) {
        params = params.set('user', dataObject.user);
      }

      if (!this.core.isEmptyOrNull(dataObject.reason)) {
        params = params.set('reason', dataObject.reason);
      }

      return new Promise((resolve, reject) => {
        this.http.post<any>(url, params, this.httpOptions)
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

  /* *
   *       requestS
   * ************************************************************************************************/
  /** GET: fetch the details of a request*/
  getAllRequests(): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/requests`;

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


   /** GET: fetch the details of a request*/
   getAllPatientRequests(id): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/usrrequests`;


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

  /** GET: fetch the details of a request*/
  getRequest(id): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/request`;

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

  /** GET: fetch the details of a request*/
  getRequestByToken(): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/request`;

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
  updateRequest(dataObject): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/uprequestbymed`;


      if (!this.core.isEmptyOrNull(dataObject.id)) {
        url += `/${encodeURIComponent(dataObject.id)}`;
      }

      let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });


      if (!this.core.isEmptyOrNull(dataObject.name)) {
        params = params.set('name', dataObject.name);
      }

      if (!this.core.isEmptyOrNull(dataObject.email)) {
        params = params.set('email', dataObject.email);
      }

      if (!this.core.isEmptyOrNull(dataObject.phone)) {
        params = params.set('phone', dataObject.phone);
      }

      if (!this.core.isEmptyOrNull(dataObject.section)) {
        params = params.set('section', dataObject.section);
      }


      if (!this.core.isEmptyOrNull(dataObject.reason)) {
        params = params.set('reason', dataObject.reason);
      }


      if (!this.core.isEmptyOrNull(dataObject.requestcomment)) {
        params = params.set('requestcomment', dataObject.requestcomment);
      }


      if (!this.core.isEmptyOrNull(dataObject.time)) {
        params = params.set('time', dataObject.time);
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


  deleteRequest(id): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/requestdelete`;


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
