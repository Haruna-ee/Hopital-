import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "../../../services/authentication.service";
import { CoreService } from "../../../core/core.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users: any[];
  public user: any;

  public loadingData = false;


  constructor(public userService: UserService,
    private translate: TranslateService,
    public router: Router,
    private authenticationservice: AuthenticationService,
    public core: CoreService) { }

  ngOnInit() {
    this.getUser();
  }



  async getUser() {
    this.loadingData = true;
    await this.userService.getUserByToken().then(user => {
      this.user = user;
      let temp = []
      temp.push(user);
      localStorage.setItem('currentUser', JSON.stringify(temp));
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getUser');
    });

  }



  onLogout() {
    this.loadingData = true;
    this.authenticationservice
      .logout(3434)
      .then(r => {

        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        localStorage.setItem("page", "login");
        location.href = "";
        this.loadingData = false;

      })
      .catch(e => {
        this.loadingData = false;
        this.core.handleError(e, "Logout");
      });
  }

  redirectTo(uri) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }



}
