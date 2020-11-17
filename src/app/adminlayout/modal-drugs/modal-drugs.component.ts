import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { DrugsService } from '../../services/drugs.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modal-drugs',
  templateUrl: './modal-drugs.component.html',
  styleUrls: ['./modal-drugs.component.css']
})
export class ModalDrugsComponent implements OnInit {
  @ViewChild('addUpdateDrugModal', { static: false }) addUpdateModal: any;
  @ViewChild('deleteDrugModal', { static: false }) deleteModal: any;

  closeResult: string;
  public modalTitle = '';
  public loadingData = false;

  modalReference: any;

  @Input() drug: any;

  @Input() action: any;
  @Input() origin: any;

  @Output() drugModalClosed = new EventEmitter();
  @Output() drugAdded = new EventEmitter();
  @Output() drugUpdated = new EventEmitter();
  @Output() drugDeleted = new EventEmitter();


  drugForm: FormGroup;

  constructor(
    public core: CoreService,
    private drugsService: DrugsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.drugForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.drugForm.controls; }


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
      } else if (this.action == 'update') {
        this.modalTitle = 'Update Drug';
        this.populateDrugForm();
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


  onSubmitDrug() {

    if (this.drugFormIsValid()) {
      const values = this.drugForm.value;

      if (this.action == 'add') {
        this.addDrug(values);
      } else if (this.action == 'update') {
        this.updateDrug(values);
      } else if (this.action == 'delete') {
        this.deleteDrug();
      } else {
        console.warn('action not specified, don\'t know what to do.');
      }
    }
  }


  addDrug(values) {
    this.loadingData = true;
    this.drugsService.addDrug(values).then((result) => {
      this.loadingData = false;
      this.core.success(`Drug successfully created`);
      this.closeModal();
      this.drugAdded.emit(values.id);
      this.resetDrugForm();
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'addDrug');
    });
  }

  closeModal() {
    this.modalReference.close();
    this.notifyOfModalDismissal();
  }

  notifyOfModalDismissal() {
    this.drugModalClosed.emit();
    if (this.action == 'add' || this.action == 'update') {
      this.resetDrugForm();
    }
  }


  updateDrug(values) {
    this.loadingData = true;
   values.id = this.drug.id;
    this.drugsService.updateDrug(values).then((result) => {
      this.loadingData = false;
      this.core.success(`Drug successfully updated`);
      this.closeModal();
      this.drugUpdated.emit(values.id);
      this.resetDrugForm();
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'updateDrug');
    });
  }

  resetDrugForm() {
    this.drugForm.reset();

  }

  drugFormIsValid() {
    if (this.action == 'add' || this.action == 'update') {
      return this.drugForm.controls.name.valid
        && this.drugForm.controls.category.valid
        && this.drugForm.controls.price.valid;
    }
  }

  restoreDrugForm() {
    this.populateDrugForm();
  }

  populateDrugForm() {

    this.drugForm.patchValue({
      name: this.drug.name,
      category: this.drug.category,
      price: this.drug.price
    });

  }

  deleteDrug() {
    const id = this.drug.id;
    // this.loadingData = true;
    this.drugsService.deleteDrug(id).then(() => {
      this.loadingData = false;

      this.core.success(`Drug successfully deleted`);
      this.closeModal();

      this.drugDeleted.emit(id);
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'deleteDrug');
    });
  }

}

