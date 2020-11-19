import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap"
import { AlertService } from "./../components/alert/alert.service";
import { UrlsService } from "./urls.service";
import 'rxjs/add/operator/timeout'

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public baseUrl;
  public loginUser: any;
  public locale = "en-GH"; // Great Britain locale
  public defaultCountry = "CM";
  public defaultCity = "";
  public currency = "XAF";
  public pageMenu: string;

  public httpTimeout = 30 * 1000;
  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  };


  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  public ngbModalOptionsSm: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'sm'
  };

  public ngbModalOptionsLg: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  public ngbModalOptionsXl: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  public ngbModalOptionsNested: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };




  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    private urlService: UrlsService,
    private modalService: NgbModal,
  ) {
    this.baseUrl = urlService.baseUrl;

    if (!this.isEmptyOrNull(localStorage.getItem("currentUser"))) {
      this.loginUser = JSON.parse(localStorage.getItem("currentUser"));
      this.pageMenu = this.loginUser[0].role;
    }


  }

  makeRemoteRequest(url, method, params, options, timeout?) {
    if (method.toLowerCase() == "get") {
      return new Promise((resolve, reject) => {
        this.http
          .get<any>(url)
          .timeout(timeout || this.httpTimeout)
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
            }
          );
      });
    } else if (method.toLowerCase() == "post") {
      return new Promise((resolve, reject) => {
        this.http
          .post<any>(url, params)
          .timeout(timeout || this.httpTimeout)
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
            }
          );
      });
    } else if (method.toLowerCase() == "put") {
      return new Promise((resolve, reject) => {
        this.http
          .put<any>(url, params, options)
          .timeout(timeout || this.httpTimeout)
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
            }
          );
      });
    } else if (method.toLowerCase() == "delete") {
      return new Promise((resolve, reject) => {
        this.http
          .delete<any>(url, options)
          .timeout(timeout || this.httpTimeout)
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
            }
          );
      });
    } else {
      console.log(`method ${method} is not implemented`);
    }
  }

  handleError(e, origin, notifyUser: boolean = true) {
    console.error("origin: ", origin);
    console.error(e);

    if (e) {
      if (e.error) {
        this.error(e.error.message);
      } else if (e == "Token has expired. Login again before continuing") {
        const timer = setTimeout(() => {
          this.redirectToLogin();
          clearTimeout(timer);
        }, 3000);
      } else {
        this.error(e);
      }

    } else {
      this.error("Server Idle... refresh and login.");
    }

  }

  redirectToLogin() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.setItem("page", "login");
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    this.router.navigate(["/login"]);
  }

  normalizeKeys(input) {
    if (input && typeof input == "object") {
      if (input.hasOwnProperty("length")) {
        // input is an array
        if (input.length > 0) {
          for (let i = 0; i < input.length; i++) {
            input[i] = this.keysToLowerCase(input[i]);
          }
        }
      } else {
        // input is an object
        input = this.keysToLowerCase(input);
      }
    } else {
      console.error("This is neither an object nor an array");
    }
    return input;
  }

  keysToLowerCase(obj) {
    Object.keys(obj).forEach(function (key) {
      let k = key.toLowerCase();

      if (k !== key) {
        obj[k] = obj[key];
        delete obj[key];
      }
    });
    return obj;
  }

  fakePromise(type, message) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (type == "error") {
          reject({ msg: message });
        } else {
          // type == "success"
          resolve(message);
        }
      }, 500);
    });
    return promise;
  }

  onFileSaving(event, fileName) {
    let date = new Date();
    let year = date.getFullYear();
    let month =
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let seconds =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    event.fileName = `${fileName} ${day}-${month}-${year} ${hours}-${minutes}-${seconds}`;
  }



  isEmptyOrNull(value: string) {
    if (
      value == "" ||
      value == null ||
      value == undefined ||
      value == "undefined"
    ) {
      return true;
    }
    return false;
  }


  success(msg) {
   this.alertService.success(msg, true);
  }

  error(msg) {
    this.alertService.error(msg, true);
  }

  closeAlert() {
    this.alertService.close();
  }


  resetModalOptions() {
    this.ngbModalOptions.backdrop = 'static';
    this.ngbModalOptions.keyboard = false;
    if (this.ngbModalOptions.size) {
      delete this.ngbModalOptions.size;
    }
  }


}
