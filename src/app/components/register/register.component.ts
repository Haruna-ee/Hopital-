import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../services/authentication.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public loading = false;
  public registerForm = this.formBuilder.group({
    email: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public core: CoreService) { }

  ngOnInit() {
  }

  onSubmit() {
    let values = this.registerForm.value;

    this.loading = true;

    if (this.core.isEmptyOrNull(values.email) || this.core.isEmptyOrNull(values.password)) {
      this.core.error("Email and password is required.");
      this.loading = false;
      return;
    }

    if (values.password != values.confirmPassword) {
      this.core.error("Passwords must match");
      this.loading = false;
      return;
    }


    if (this.core.isEmptyOrNull(values.role)) {
      this.core.error("Select role");
      this.loading = false;
      return;
    }

    this.authenticationService.register(values).then(r => {
      localStorage.setItem('token', JSON.stringify(r));
      this.core.success('Sign up succesful, check email and verify your account, then login')
      setTimeout(function () {
        this.location.href = "/login";
      }, 2000);
      this.loading = false;

    }).catch(e => {
      this.loading = false;
      this.core.handleError(e, "signup");
    });

  }

}
