import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "../../services/authentication.service";
import { CoreService } from "../../core/core.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[];
  public user: any;
  public doctors: any;
  public nurses: any;
  public patients: any;
  public role: any;

  public loadingData = false;

  constructor(public usersService: UserService,
    private translate: TranslateService,
    public router: Router,
    private authenticationservice: AuthenticationService,
    public core: CoreService
  ) {
  }

  ngOnInit() {
    if (!this.core.isEmptyOrNull(localStorage.getItem("currentUser"))) {
      this.getRole();
    } else {
      this.getUser();
    }

  }

  async getUser() {
    this.loadingData = true;
    await this.usersService.getUserByToken().then(user => {
      this.user = user;
      this.core.pageMenu = this.user.role;
      let temp = []
      temp.push(user);
      localStorage.setItem('currentUser', JSON.stringify(temp));
      this.getRole();
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getUser');
    });

  }

  async getRole() {
    this.role = this.core.pageMenu;
    this.getAllUsers();
  }


  async getAllUsers() {
    this.loadingData = true;
    await this.usersService.getAllUsers().then(users => {
      if (users)
        this.users = users.filter(user => {
          return user.role != "admin";
        });

      this.doctors = users.filter(user => {
        return user.role == "doctor";
      });
      this.nurses = users.filter(user => {
        return user.role == "nurse";
      });
      this.patients = users.filter(user => {
        return user.role == "patient";
      });
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getAllUsers');
    });
  }



  onLoggedout() {
    localStorage.removeItem("isLoggedin");
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

}
