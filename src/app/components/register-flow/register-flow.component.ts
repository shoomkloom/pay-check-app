import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ServerApiService } from 'src/app/services/server-api.service';

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

  constructor(private serverApi: ServerApiService) { }

  ngOnInit(): void {
    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }

  step01Done(){
    this.regstep01 = false;
    this.regstep02 = true;
  }
}
