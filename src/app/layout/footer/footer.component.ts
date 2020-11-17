import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { SubscriberService } from '../../services/subscriber.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  subscribeForm: FormGroup;
  public loadingData = false;
  public success= false;

  constructor(
    public core: CoreService,
    private subscriberService: SubscriberService,
    private fb: FormBuilder,) { }

  ngOnInit() {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  get f() { return this.subscribeForm.controls; }


  subscribe() {
    if (this.subscriberFormIsValid()) {
      const values = this.subscribeForm.value;
      this.subscribeToNewsletter(values);
    }
  }

  subscribeToNewsletter(values) {
    this.loadingData = true;
    this.subscriberService.addSubscription(values).then((result) => {
      this.loadingData = false;
      this.success = true;
      this.core.success(`Successfully subscribed to newsletter`);
      this.resetSubscribeForm();
    }).catch((e) => {
      this.loadingData = false;
      this.core.handleError(e, 'subscribeToNewsletter');
    });
  }

  resetSubscribeForm() {
    this.subscribeForm.reset();

  }

  subscriberFormIsValid() {
    return this.subscribeForm.controls.email.valid;
  }

}
