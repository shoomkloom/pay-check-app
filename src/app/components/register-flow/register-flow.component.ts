import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { ServerApiService } from 'src/app/services/server-api.service';
import { ApplicationInsightsService } from 'src/app/services/application-insights.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-register-flow',
  templateUrl: './register-flow.component.html',
  styleUrls: ['./register-flow.component.css']
})
export class RegisterFlowComponent implements OnInit {
  appInsights: ApplicationInsightsService;
  currentUser: User;
  regstep01: Boolean = false;
    
  constructor(
    private router: Router,
    private serverApi: ServerApiService
  ) {
    this.appInsights = new ApplicationInsightsService(router);
   }

  ngOnInit(): void {
    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }

  step01Done(){
    this.appInsights.trackTrace('RegisterFlowComponent::step01Done()');

    this.regstep01 = false;
  }
}
