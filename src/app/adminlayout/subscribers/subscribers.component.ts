import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { SubscribersService } from "../../services/subscribers.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  public subscribersStateOptions = {
    enabled: true,
    storageKey: `usersState_${"3534"}`,
  };

  public subscribers = [];
  public loadingData = false;


  constructor(public core: CoreService,
    private _formBuilder: FormBuilder, public subscribersService: SubscribersService,
    private modalService: NgbModal,) { }


  ngOnInit() {
    this.getAllSubscribers();
  }



  async getAllSubscribers() {
    this.loadingData = true;
    await this.subscribersService.getAllSubscribers().then(subscribers => {
      this.subscribers = subscribers;
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getAllSubscribers');
    });
  }




}


