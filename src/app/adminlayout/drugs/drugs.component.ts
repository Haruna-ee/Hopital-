

import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { DrugsService } from "../../services/drugs.service";
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
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {
  @ViewChild('drugModals', { static: false }) drugModals;
  @ViewChild("drugsContainer", { static: false }) drugsDataGrid: DxDataGridComponent;


  public drugsStateOptions = {
    enabled: true,
    storageKey: `drugsState_${"3534"}`,
  };

  public theDrug = null;
  public drugModalAction = '';

  public drugs = [];
  public loadingData = false;


  constructor(private core: CoreService,
    private _formBuilder: FormBuilder, public drugService: DrugsService,
    private modalService: NgbModal,) { }


  ngOnInit() {
    this.getAllDrugs();
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


  openDrugModal(action, drug, event = null) {

    if (event) {
      event.stopPropagation();
    }


    this.drugModalAction = action;
    this.drugModals.origin = origin;
    this.drugModals.action = action;
    this.theDrug = drug;
    this.drugModals.openModal();

  }

  /* Closed */
  onDrugModalClosed() {
    this.theDrug = null;
    this.drugModalAction = '';
  }

  /* added */
  onDrugAdded(id) {
    this.getAllDrugs();
  }

  /* updated */
  onDrugUpdated(id) {
    this.getAllDrugs();
  }


  /* Deleted */
  onDrugDeleted(id) {
    this.getAllDrugs();
  }









}

