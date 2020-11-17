import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../core/core.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public role: any;
  public loadingData = false;
  public user: any;

  constructor(private core: CoreService,
    private usersService: UserService,) { }

  ngOnInit() {
    if (!this.core.isEmptyOrNull(localStorage.getItem("currentUser"))) {
      this.role= this.core.pageMenu;
    } else {
      this.getUser();
    }
  }


  async getUser() {
    this.loadingData = true;
    await this.usersService.getUserByToken().then(user => {
      this.user = user;
      this.getRole(user);
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getUser');
    });

  }

  async getRole(user) {
    this.role = user.role;
  }



}
