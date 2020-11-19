import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { DrugsService } from '../../services/drugs.service';
import { RequestsService } from '../../services/requests.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modal-request',
  templateUrl: './modal-request.component.html',
  styleUrls: ['./modal-request.component.css']
})
export class ModalRequestComponent implements OnInit {

  @ViewChild('addUpdateRequestModal', { static: false }) addUpdateModal: any;
  @ViewChild('deleteRequestModal', { static: false }) deleteModal: any;
  @ViewChild('requestDetailsModal', { static: false }) requestDetailsModal: any;

  closeResult: string;
  public modalTitle = '';
  public loadingData = false;

  public userdrugs: any;

  modalReference: any;

  @Input() request: any;
  @Input() users: any;

  @Input() action: any;
  @Input() origin: any;

  @Output() requestModalClosed = new EventEmitter();
  @Output() requestAdded = new EventEmitter();
  @Output() requestUpdated = new EventEmitter();
  @Output() requestDeleted = new EventEmitter();


  requestForm: FormGroup;

  constructor(
    public core: CoreService,
    private requestsService: RequestsService,
    private drugsService: DrugsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      reason: ['', Validators.required],
      section: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      time: [''],
      requestcomment: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.requestForm.controls; }


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
        this.modalTitle = 'Create request';
        this.modalReference = this.modalService.open(this.addUpdateModal, this.core.ngbModalOptions);
      } else if (this.action == 'update') {
        this.modalTitle = 'Update request';
        this.populateRequestForm();
        this.modalReference = this.modalService.open(this.addUpdateModal, this.core.ngbModalOptions);
      } else if (this.action == 'view') {
        this.modalTitle = 'View request';
        this.getAllUserDrugs();
        this.modalReference = this.modalService.open(this.requestDetailsModal, this.core.ngbModalOptions);
      } else if (this.action == 'delete') {
        this.modalTitle = 'Delete request';
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


  onSubmitRequest() {

    if (this.requestFormIsValid()) {
      const values = this.requestForm.value;

      if (this.action == 'update') {
        this.updateRequest(values);
      } else if (this.action == 'delete') {
        this.deleteRequest();
      } else {
        console.warn('action not specified, don\'t know what to do.');
      }

    }
  }

  closeModal() {
    this.modalReference.close();
    this.notifyOfModalDismissal();
  }

  notifyOfModalDismissal() {
    this.requestModalClosed.emit();
    if (this.action == 'add' || this.action == 'update') {
      this.resetRequestForm();
    }
  }


  updateRequest(values) {
    this.loadingData = true;
    const reqId = this.request.id;
    values.id = reqId;
    this.requestsService.updateRequest(values).then((result) => {
      this.loadingData = false;
      this.core.success(`request successfully updated`);
      this.closeModal();
      this.requestUpdated.emit(reqId);
      this.resetRequestForm();
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'updateRequest');
    });
  }


  async getAllUserDrugs() {
    this.loadingData = true;
    await this.drugsService.getAllUserDrugs(this.request.email).then(drugs => {
      let data = [];
      //this.userdrugs = drugs;
      drugs.forEach((drug) => {


        this.drugsService
          .getDrug(drug.drug)
          .then((drugDetails) => {
            drug.drugname = drugDetails.name;
            data.push(drug);
            this.userdrugs = [...data];
          });

      });
      this.loadingData = false;
    }).catch(e => {
      this.loadingData = false;
      this.core.handleError(e, 'getAllUserDrugs');
    });
  }


  resetRequestForm() {
    this.requestForm.reset();

  }

  requestFormIsValid() {
    if (this.action == 'add') {
      return this.requestForm.controls.name.valid
        && this.requestForm.controls.email.valid
        && this.requestForm.controls.phone.valid
        && this.requestForm.controls.reason.valid
        && this.requestForm.controls.section.valid;
    } else {
      return true;
    }
  }


  restoreRequestForm() {
    this.populateRequestForm();
  }

  populateRequestForm() {

    this.requestForm.patchValue({
      name: this.request.name,
      email: this.request.email,
      phone: this.request.phone,
      time: this.request.time,
      section: this.request.section,
      reason: this.request.reason,
      requestcomment: this.request.requestcomment,
    });

  }

  deleteRequest() {
    const id = this.request.id;
    this.loadingData = true;
    this.requestsService.deleteRequest(id).then(() => {
      this.loadingData = false;

      this.core.success(`request successfully deleted`);
      this.closeModal();

      this.requestDeleted.emit(id);
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'deleteRequest');
    });
  }

}

