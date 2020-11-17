import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { DrugsService } from '../../services/drugs.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modal-user-drugs',
  templateUrl: './modal-user-drugs.component.html',
  styleUrls: ['./modal-user-drugs.component.css']
})
export class ModalUserDrugsComponent implements OnInit {
  @ViewChild('addUpdateUserDrugModal', { static: false }) addUpdateModal: any;
  @ViewChild('deleteUserDrugModal', { static: false }) deleteModal: any;

  closeResult: string;
  public modalTitle = '';
  public loadingData = false;

  modalReference: any;


  @Input() userDrug: any;
  @Input() drugs: any;
  @Input() request: any;

  @Input() action: any;
  @Input() origin: any;

  @Output() userDrugModalClosed = new EventEmitter();
  @Output() userDrugAdded = new EventEmitter();
  @Output() userDrugUpdated = new EventEmitter();
  @Output() userDrugDeleted = new EventEmitter();


  userDrugForm: FormGroup;

  constructor(
    public core: CoreService,
    private drugsService: DrugsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.userDrugForm = this.fb.group({
      drug: ['', Validators.required],
      prescription: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userDrugForm.controls; }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openModal() {
    const timer = setTimeout(() => {
      if (this.action == 'add') {
        this.modalTitle = 'Create Drug';
        this.modalReference = this.modalService.open(this.addUpdateModal, this.core.ngbModalOptions);
      } else if (this.action == 'delete') {
        this.modalTitle = 'Delete Drug';
        this.modalReference = this.modalService.open(this.deleteModal, this.core.ngbModalOptions);
      }
      if (this.modalReference) {
        this.modalReference.result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.notifyOfModalDismissal();
        });
      }
      clearTimeout(timer);
    }, 10);
  }


  onSubmitUserDrug() {

    if (this.userDrugFormIsValid()) {
      const values = this.userDrugForm.value;

      if (this.action == 'add') {
        this.addUserDrug(values);
      } else if (this.action == 'delete') {
        this.deleteUserDrug();
      } else {
        console.warn('action not specified, don\'t know what to do.');
      }
    }
  }


  addUserDrug(values) {
    this.loadingData = true;
    values.user = this.request.user;
    this.drugsService.addUserDrug(values).then((result) => {
      this.loadingData = false;
      this.core.success(`Prescription successfully added`);
      this.closeModal();
      this.userDrugAdded.emit(this.request.id);
      this.resetUserDrugForm();
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'addUserDrug');
    });
  }

  closeModal() {
    this.modalReference.close();
    this.notifyOfModalDismissal();
  }

  notifyOfModalDismissal() {
    this.userDrugModalClosed.emit();
    if (this.action == 'add' || this.action == 'update') {
      this.resetUserDrugForm();
    }
  }

  resetUserDrugForm() {
    this.userDrugForm.reset();

  }

  userDrugFormIsValid() {
    if (this.action == 'add' || this.action == 'update') {
      return this.userDrugForm.controls.drug.valid
        && this.userDrugForm.controls.prescription.valid;
    }
  }


  deleteUserDrug() {
    const id = this.userDrug.id;
    // this.loadingData = true;
    this.drugsService.deleteUserDrug(id).then(() => {
      this.loadingData = false;

      this.core.success(`Drug successfully deleted`);
      this.closeModal();

      this.userDrugDeleted.emit(id);
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'deleteUserDrug');
    });
  }

}

