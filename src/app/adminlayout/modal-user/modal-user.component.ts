import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { UserService } from '../../services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  @ViewChild('addUpdateUserModal', { static: false }) addUpdateModal: any;
  @ViewChild('deleteUserModal', { static: false }) deleteModal: any;

  closeResult: string;
  public modalTitle = '';
  public loadingData = false;

  modalReference: any;

  @Input() user: any;
  @Input() users: any;

  @Input() action: any;
  @Input() origin: any;

  @Output() userModalClosed = new EventEmitter();
  @Output() userAdded = new EventEmitter();
  @Output() userUpdated = new EventEmitter();
  @Output() userDeleted = new EventEmitter();


  userForm: FormGroup;

  constructor(
    public core: CoreService,
    private usersService: UserService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }


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
        this.modalTitle = 'Create User';
        this.modalReference = this.modalService.open(this.addUpdateModal, this.core.ngbModalOptions);
      } else if (this.action == 'update') {
        this.modalTitle = 'Update User';
        this.populateUserForm();
        this.modalReference = this.modalService.open(this.addUpdateModal, this.core.ngbModalOptions);
      } else if (this.action == 'delete') {
        this.modalTitle = 'Delete User';
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


  onSubmitUser() {

    if (this.userFormIsValid()) {
      const values = this.userForm.value;

      if (this.action == 'add') {
        this.addUser(values);
      } else if (this.action == 'update') {
        this.updateUser(values);
      } else if (this.action == 'changePassword') {
        this.changeUserPassword(values);
      } else if (this.action == 'delete') {
        this.deleteUser();
      } else {
        console.warn('action not specified, don\'t know what to do.');
      }
    }
  }


  addUser(values) {
    this.loadingData = true;
    // this.usersService.addUser(values).then((result) => {
    //   this.loadingData = false;
    //   this.core.success(`User successfully created`);
    //   this.closeModal();
    //   const id = result[0].uid;
    //   this.userAdded.emit(id);
    //   this.resetUserForm();
    // }).catch((e) => {
    //   this.loadingData = false;
    //   this.core.handleError(e, 'addUser');
    // });
  }

  changeUserPassword(values) {
    const userID = this.user.userId;
    // console.log(values);
    this.loadingData = true;
    // this.usersService.editUserPassword(userID, values.lastname, values.hint, values.changePasswordOnLogin).then((result) => {
    //   this.loadingData = false;
    //   this.core.success(`User lastname successfully updated`);
    //   this.closeModal();
    //   this.resetUserForm();
    // }).catch((e) => {
    //   this.loadingData = false;
    //   this.core.handleError(e, 'updateUser');
    // });
  }

  closeModal() {
    this.modalReference.close();
    this.notifyOfModalDismissal();
  }

  notifyOfModalDismissal() {
    this.userModalClosed.emit();
    if (this.action == 'add' || this.action == 'update') {
      this.resetUserForm();
    }
  }


  updateUser(values) {
    this.loadingData = true;
    const userId = this.user.id;
    values.id = userId;
    this.usersService.updateUser(values).then((result) => {
      this.loadingData = false;
      this.core.success(`User successfully updated`);
      this.closeModal();
      this.userUpdated.emit(userId);
      this.resetUserForm();
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'updateUser');
    });
  }

  resetUserForm() {
    this.userForm.reset();

  }

  userFormIsValid() {
    if (this.action == 'add') {
      return this.userForm.controls.username.valid
        && this.userForm.controls.firstname.valid
        && this.userForm.controls.email.valid
        && this.userForm.controls.phone.valid
        && this.userForm.controls.lastname.valid;
    } else {
      return true;
    }
  }

  passwordsMatch() {
    return this.userForm.controls.lastname.value == this.userForm.controls.confirmPwd.value;
  }

  restoreUserForm() {
    this.populateUserForm();
  }

  populateUserForm() {

    this.userForm.patchValue({
      username: this.user.username,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      phone: this.user.phone,
      email: this.user.email
    });

  }

  deleteUser() {
    const id = this.user.id;
    // this.loadingData = true;
    this.usersService.deleteUser(id).then(() => {
      this.loadingData = false;

      this.core.success(`User successfully deleted`);
      this.closeModal();

      this.userDeleted.emit(id);
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'deleteUser');
    });
  }

}
