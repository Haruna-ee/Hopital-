import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router, NavigationEnd } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { CoreService } from "../../core/core.service";
import { RequestsService } from "../../services/requests.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  users: any[];
  public user: any;
  public doctors: any;
  public nurses: any;
  public patients: any;
  public role: any;
  public action: any;
  public success = false;

  public loadingData = false;

  requestForm: FormGroup;

  constructor(public usersService: UserService,
    private translate: TranslateService,
    public router: Router,
    private fb: FormBuilder,
    public requestService: RequestsService,
    private modalService: NgbModal,
    public core: CoreService
  ) {
  }

  ngOnInit() {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      reason: [''],
      section: ['', Validators.required],
      user: ['', Validators.required],
    });
    this.getAllMedicals();
  }


  async getAllMedicals() {
    this.loadingData = true;
    await this.usersService.getAllMedicals().then(users => {
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
      this.core.handleError(e, 'getAllMedicals');
    });
  }

  onSubmitRequest() {
    if (this.requestFormIsValid()) {
      const values = this.requestForm.value;
      this.addRequest(values);
    }
  }

  requestFormIsValid() {
    return this.requestForm.controls.name.valid
      && this.requestForm.controls.email.valid
      && this.requestForm.controls.phone.valid
      && this.requestForm.controls.section.valid
      && this.requestForm.controls.user.valid
      && this.requestForm.controls.reason.valid;


  }

  addRequest(values) {
    this.loadingData = true;
    this.requestService.addRequest(values).then((result) => {
      this.loadingData = false;
      this.success = true;
      this.core.success(`Request successfully made`);
      this.resetRequestForm();
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'addRequest');
    });
  }

  resetRequestForm() {
    this.requestForm.reset();
  }


}
