import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/user-data';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Helpers } from '../helpers';
import { AppError } from 'src/app/app-error';
import { ApplicationInsightsService } from 'src/app/services/application-insights.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-regstep02',
  templateUrl: './regstep02.component.html',
  styleUrls: ['./regstep02.component.css']
})
export class Regstep02Component implements OnInit {
  appInsights: ApplicationInsightsService;
  currentUser: User;
  userData: UserData;
  loading = false;
  submitted = false;
  
  @Output() step02Done = new EventEmitter();

  constructor(
    private router: Router,
    private alertService: AlertService,
    private serverApi: ServerApiService,
    private helpers: Helpers
  ) { 
    this.appInsights = new ApplicationInsightsService(router);
  }

  ngOnInit(): void {
    this.alertService.clear();  

    this.serverApi.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.userData = this.helpers.getCurrentUserData();
    if(!this.userData || !this.userData.userid){
      this.userData = new UserData();
      this.userData.userid = this.currentUser._id;
    }
  }

  onSubmit() {
    this.appInsights.trackTrace('Regstep02Component::onSubmit()');
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.helpers.setCurrentUserData(this.userData);

    //Update the user data
    this.serverApi.userDataCreate(this.userData)
      .subscribe(
        (validUserData: UserData) => {
          this.appInsights.trackTrace('Regstep02Component: userDataCreate success!');
          this.helpers.setCurrentUserData(validUserData);
          this.currentUser.fullyregestered = true;
          this.loading = false;
          this.serverApi.updateUser(this.currentUser);
        },
        (error: AppError) => {
          this.appInsights.trackException(`Regstep02Component: ${JSON.stringify(error)}`);
          console.log('ERROR:', error);
          if(error.status === 400 || error.status === 401){
            this.alertService.error(`שגיאה בחיבור לשרת: ${error}`);
          }
          else{
            this.alertService.error(`שגיאה לא מזוהה בחיבור לשרת: ${error}`);
          }
          this.loading = false;
        }
      )
  }
}
