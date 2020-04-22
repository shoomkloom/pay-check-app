import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { ServerApiService } from './services/server-api.service';
import { AlertService } from './services/alert.service';
import { ApplicationInsightsService } from './services/application-insights.service';

@Component({
  selector: 'pc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appInsights: ApplicationInsightsService;
  title = 'Pay Check';
  currentUser: User;

  constructor(
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) {
    this.appInsights = new ApplicationInsightsService(router);
   }

  ngOnInit() {
      this.serverApi.currentUser.subscribe(userData => {
        this.currentUser = userData;
      });

      if(!this.currentUser || !this.currentUser.name){
        this.router.navigate(['/login']);
      }
  }

  logout() {
      // reset alerts on logout
      this.alertService.clear();
      this.serverApi.logout();
  }

  login() {
    this.router.navigate(['/login']);
  }
}