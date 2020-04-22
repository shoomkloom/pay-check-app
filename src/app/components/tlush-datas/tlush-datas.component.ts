import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { NodeWithI18n } from '@angular/compiler';
import { Router } from '@angular/router';
import { ApplicationInsightsService } from 'src/app/services/application-insights.service';

@Component({
  selector: 'pc-tlush-datas',
  templateUrl: './tlush-datas.component.html',
  styleUrls: ['./tlush-datas.component.css']
})
export class TlushDatasComponent implements OnInit {
  appInsights: ApplicationInsightsService;
  currentUser: User;
  loaded = false;
  createdDate: Date;
  
  constructor(
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { 
    this.appInsights = new ApplicationInsightsService(router);
  }

  ngOnInit(): void {
    this.alertService.clear();  

    this.serverApi.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    setTimeout (() => {
      this.createdDate = new Date(Date.now());
      this.loaded = true;
   }, 2000);
  }
}
