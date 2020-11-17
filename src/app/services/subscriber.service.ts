import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlsService } from '../core/urls.service';
import { CoreService } from '../core/core.service';
import { CustomHttpParamEncoder } from "../core/custom-http-param-encoder";
import "rxjs/add/operator/timeout";

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

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

  getAllSubscribers(): Promise<any> {
    // if(this.core.userHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/subscribers`;

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
  addSubscription(dataObject): Promise<any> {
    // if(this.core.requestHasPermission('xxx')){
    if (true) {
      const url = `${this.baseUrl}/subscribe`;
      let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });

      // These parameters are always passed

      if (!this.core.isEmptyOrNull(dataObject.email)) {
        params = params.set('email', dataObject.email);
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


}
