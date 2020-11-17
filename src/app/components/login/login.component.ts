import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public core: CoreService) { }

  ngOnInit() {

  }


  get f() { return this.loginForm.controls; }


  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    let values = this.loginForm.value;
    this.loading = true;

    if (this.core.isEmptyOrNull(values.email) || this.core.isEmptyOrNull(values.password)) {
      this.core.error("Email and password is required.");
      this.loading = false;
      return;
    }

    this.authenticationService.login(values).then(r => {
      localStorage.setItem('token', JSON.stringify(r));
      this.core.success('Login successful.Logging you in......')
      setTimeout(function () {
        this.location.href = "/home";
      }, 2000);
      this.loading = false;

    }).catch(e => {
      this.loading = false;
      this.core.handleError(e, "login");
    });


  }

}
