
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { UserService } from "../../services/user.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridComponent } from "devextreme-angular";
import { HeaderComponent } from '../components/header/header.component';

import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import {
  NgbDateStruct,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";




@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = "/";

  parse(value: string): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
      let date = value.split(this.DELIMITER);
      result = {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return result;
  }

  format(date: NgbDateStruct): string {
    let result: string = null;
    if (date) {
      result =
        date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
    }
    return result;
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [HeaderComponent]
})
export class ProfileComponent implements OnInit {

  @ViewChild('userModals', { static: false }) userModals;
  @ViewChild("usersContainer", { static: false }) usersDataGrid: DxDataGridComponent;


  public usersStateOptions = {
    enabled: true,
    storageKey: `usersState_${"3534"}`,
  };

  public theUser = null;
  public userModalAction = '';

  public users = [];
  public loadingData = false;


  public user: any;


  constructor(private core: CoreService,
    private _formBuilder: FormBuilder, public userService: UserService,
    public headerComponent: HeaderComponent,
    private modalService: NgbModal,) { }


  ngOnInit() {
    this.getUser();
  }



  async getUser() {
    this.loadingData = true;
    await this.userService.getUserByToken().then(user => {
      this.user = user;
      this.core.pageMenu = this.user.role;
      let temp = []
      temp.push(user);
      localStorage.setItem('currentUser', JSON.stringify(temp));
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getUser');
    });

  }

  openUserModal(action, user, event = null) {

    if (event) {
      event.stopPropagation();
    }


    this.userModalAction = action;
    this.userModals.action = action;
    this.theUser = this.user;
    this.userModals.openModal();

  }


  /* Closed */
  onUserModalClosed() {
    this.theUser = null;
    this.userModalAction = '';
  }

  /* updated */
  onUserUpdated(id) {
    this.getUser();
    this.headerComponent.getUser();
  }



}


