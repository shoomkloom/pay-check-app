import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { ServerApiService } from '../../services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Helpers } from '../helpers';
import { ApplicationInsightsService } from 'src/app/services/application-insights.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appInsights: ApplicationInsightsService;
  currentUser: User;

  constructor(
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { 
    this.appInsights = new ApplicationInsightsService(router);
  }

  ngOnInit(): void {
    this.alertService.clear();    
    
    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }
}
