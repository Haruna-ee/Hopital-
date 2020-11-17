import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { UrlsService } from "../core/urls.service";
import { CoreService } from "../core/core.service";
import { CustomHttpParamEncoder } from "../core/custom-http-param-encoder";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public baseUrl: string;
  public selfUrl: string;
  public httpOptions;
  public httpTimeout: number = 120000; //2minutes

  constructor(
    private http: HttpClient,
    private urlService: UrlsService,
    public core: CoreService
  ) {
    this.baseUrl = `${this.urlService.baseUrl}`;
  }

  /** POST: login */
  login(dataObject
    ): Promise<any> {
      let url = this.baseUrl + `/login`;

      const obj = {
        "email": dataObject.email,
        "password": dataObject.password
      };

      return this.core.makeRemoteRequest(url, "post", obj, httpOptions);
    }

  register(dataObject
  ): Promise<any> {
    let url = this.baseUrl + `/signup`;

    const obj = {
      "email": dataObject.email,
      "password": dataObject.password,
      "role": dataObject.role
    };

    return this.core.makeRemoteRequest(url, "post", obj, httpOptions);
  }


  /** POST: logout */

  logout(id): Promise<any> {

    let url = this.baseUrl + `/logout`;

    const obj = {
      "id": 35353,
    };

    return this.core.makeRemoteRequest(url, "post", obj, this.httpOptions);
  }
}
