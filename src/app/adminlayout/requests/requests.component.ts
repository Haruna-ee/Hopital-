import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { UserService } from "../../services/user.service";
import { DrugsService } from "../../services/drugs.service";
import { RequestsService } from "../../services/requests.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridComponent } from "devextreme-angular";
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
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  @ViewChild('requestModals', { static: false }) requestModals;
  @ViewChild('userDrugModals', { static: false }) userDrugModals;
  @ViewChild("requestsContainer", { static: false }) requestsDataGrid: DxDataGridComponent;


  public requestsStateOptions = {
    enabled: true,
    storageKey: `requestsState_${"3534"}`,
  };

  public role: any;
  public user: any;
  public theRequest = null;
  public requestModalAction = '';
  public requests = [];


  public theUserDrug = null;
  public userDrugModalAction = '';

  public drugs = [];


  public loadingData = false;


  constructor(private core: CoreService, public drugService: DrugsService,
    public usersService: UserService,
    private _formBuilder: FormBuilder, public requestService: RequestsService,
    private modalService: NgbModal,) { }


  ngOnInit() {

    if (!this.core.isEmptyOrNull(localStorage.getItem("currentUser"))) {
      this.getRole();
    } else {
      this.getUser();
    }
    this.getAllDrugs();
  }

  async getRole() {
    this.role = this.core.pageMenu;

    if(this.role=='patient'){
     this.getAllPatientRequests();
    }else{
     this.getAllRequests();
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

  getUserById() {
    this.loadingData = true;
    this.usersService.getUserByToken().then(user => {
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

  async getAllDrugs() {
    this.loadingData = true;
    await this.drugService.getAllDrugs().then(drugs => {
      this.drugs = drugs;
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getAllDrugs');
    });
  }

  async getAllPatientRequests() {
    this.loadingData = true;
    await this.requestService.getAllPatientRequests().then(requests => {
      this.requests = requests;
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getAllPatientRequests');
    });
  }


  async getAllRequests() {
    this.loadingData = true;
    await this.requestService.getAllRequests().then(requests => {
      this.requests = requests;
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getAllRequests');
    });
  }

  fetchDataForDisplay(data, event = null) {
    if (event) {
      event.stopPropagation();
    }

    const id = data.id ;
    if (!this.core.isEmptyOrNull(id)) {
      this.openRequestModal('view', data, event);
    }

  }

  openUserDrugModal(action, request, event = null) {

    if (event) {
      event.stopPropagation();
    }


    this.userDrugModalAction = action;
    this.userDrugModals.origin = origin;
    this.userDrugModals.action = action;
    this.theRequest = request;
    this.userDrugModals.openModal();

  }


  openRequestModal(action, request, event = null) {

    if (event) {
      event.stopPropagation();
    }


    this.requestModalAction = action;
    this.requestModals.origin = origin;
    this.requestModals.action = action;
    this.theRequest = request;
    this.requestModals.openModal();

  }

  /* Closed */
  onRequestModalClosed() {
    this.theRequest = null;
    this.requestModalAction = '';
  }

  /* added */
  onRequestAdded(id) {
    this.getAllRequests();
  }

  /* updated */
  onRequestUpdated(id) {
    this.getAllRequests();
  }


  /* Deleted */
  onRequestDeleted(id) {
    this.getAllRequests();
  }



  /* Closed */
  onUserDrugModalClosed() {
    this.theUserDrug = null;
    this.userDrugModalAction = '';
  }

  /* added */
  onUserDrugAdded(id) {
    this.getAllRequests();
  }

  /* updated */
  onUserDrugUpdated(id) {
    this.getAllRequests();
  }


  /* Deleted */
  onUserDrugDeleted(id) {
    this.getAllRequests();
  }








}
