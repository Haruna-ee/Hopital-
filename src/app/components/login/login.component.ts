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

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder,
    private authenticationservice: AuthenticationService,
    public core: CoreService) { }

  ngOnInit() {
  }

  onSubmit() {
    let values = this.loginForm.value;
    console.log(values);
    //this.loading = true;

    if (!this.core.isEmptyOrNull(values.email) || !this.core.isEmptyOrNull(values.password)) {
      // this.core.error("Username and password is required.");
      return;
    }

    // this.authenticationservice.login(values).then(r=>{
    //   //console.log(r);
    //   localStorage.setItem('currentUser', JSON.stringify(r[0]));
    //  // this.core.success("Login successful. Redirecting...");
    //   localStorage.setItem("page","menu");

    //   setTimeout(function(){
    //    this.location.href="";
    //   },2000);

    // }).catch(e=>{
    //   //this.loading = false;
    //   //this.core.handleError(e,"Login");
    // });

  }

}
