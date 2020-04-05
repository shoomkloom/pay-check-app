import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Helpers } from '../helpers';
import { AppError } from 'src/app/app-error';

@Component({
  selector: 'pc-register-flow',
  templateUrl: './register-flow.component.html',
  styleUrls: ['./register-flow.component.css']
})
export class RegisterFlowComponent implements OnInit {
  currentUser: User;
  regstep01: Boolean = false;
  regstep02: Boolean = false;
  regstep03: Boolean = false;

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }

  step01Done(){
    this.regstep01 = false;
    this.regstep02 = true;
  }

  step02Done(){
    this.regstep01 = false;
    this.regstep02 = false;
    this.regstep03 = true;
  }

  step03Done() {
    this.regstep01 = false;
    this.regstep02 = false;
    this.regstep03 = false;
  }
}
