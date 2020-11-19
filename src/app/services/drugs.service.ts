import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlsService } from '../core/urls.service';
import { CoreService } from '../core/core.service';
import { CustomHttpParamEncoder } from "../core/custom-http-param-encoder";
import "rxjs/add/operator/timeout";

@Injectable({
  providedIn: 'root'
})
export class DrugsService {

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

  addDrug(dataObject): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/drug`;
      let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });

      // These parameters are always passed

      // These parameters are only passed if not empty or null
      if (!this.core.isEmptyOrNull(dataObject.name)) {
        params = params.set('name', dataObject.name);
      }

      if (!this.core.isEmptyOrNull(dataObject.category)) {
        params = params.set('category', dataObject.category);
      }

      if (!this.core.isEmptyOrNull(dataObject.price)) {
        params = params.set('price', dataObject.price);
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

  addUserDrug(dataObject): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/usrdrug`;
      let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });

      // These parameters are always passed

      // These parameters are only passed if not empty or null
      if (!this.core.isEmptyOrNull(dataObject.drug)) {
        params = params.set('drug', dataObject.drug);
      }

      if (!this.core.isEmptyOrNull(dataObject.prescription)) {
        params = params.set('prescription', dataObject.prescription);
      }

      if (!this.core.isEmptyOrNull(dataObject.user)) {
        params = params.set('user', dataObject.user);
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

  updateDrug(dataObject): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/updrugbymed`;


      if (!this.core.isEmptyOrNull(dataObject.id)) {
        url += `/${encodeURIComponent(dataObject.id)}`;
      }

      let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });


      if (!this.core.isEmptyOrNull(dataObject.name)) {
        params = params.set('name', dataObject.name);
      }

      if (!this.core.isEmptyOrNull(dataObject.category)) {
        params = params.set('category', dataObject.category);
      }

      if (!this.core.isEmptyOrNull(dataObject.price)) {
        params = params.set('price', dataObject.price);
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



  /* *
   *       DRUGS
   * ************************************************************************************************/
  /** GET: fetch the details of a drug*/
  getAllDrugs(): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/drugs`;

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

  /** GET: fetch the details of a drug*/
  getAllUserDrugs(id): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/usrdrugsmd`;

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
  getDrug(id): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/drug`;

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

  deleteDrug(id): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/deletedrug`;


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

  deleteUserDrug(id): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      let url = `${this.baseUrl}/deleteusrdrug`;


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
