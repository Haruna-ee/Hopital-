import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.formBuilder.group({
    names: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder,
    private authenticationservice: AuthenticationService,
    public core: CoreService) { }

  ngOnInit() {
  }

  onSubmit() {
    let values = this.registerForm.value;
    console.log(values);
    //this.loading = true;

    if (!this.core.isEmptyOrNull(values.email) || !this.core.isEmptyOrNull(values.password)) {
      // this.core.error("Username and password is required.");
      return;
    }

    // this.authenticationservice.register(values).then(r=>{
    //   //console.log(r);
    //   localStorage.setItem('currentUser', JSON.stringify(r[0]));
    //  // this.core.success("register successful. Redirecting...");
    //   localStorage.setItem("page","menu");

    //   setTimeout(function(){
    //    this.location.href="";
    //   },2000);

    // }).catch(e=>{
    //   //this.loading = false;
    //   //this.core.handleError(e,"register");
    // });

  }

}
