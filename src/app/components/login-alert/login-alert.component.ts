import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-login-alert',
  templateUrl: './login-alert.component.html',
  styleUrls: ['./login-alert.component.css']
})

export class LoginAlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(
        private alertService: AlertService
        ) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            this.message = message;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    close(){
        this.alertService.close();
    }
}
