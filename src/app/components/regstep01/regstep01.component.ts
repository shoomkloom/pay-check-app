import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { UserData } from 'src/app/models/user-data';
import { Helpers } from '../helpers';
import { User } from 'src/app/models/user';
import { ApplicationInsightsService } from 'src/app/services/application-insights.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-regstep01',
  templateUrl: './regstep01.component.html',
  styleUrls: ['./regstep01.component.css']
})
export class Regstep01Component implements OnInit {
  appInsights: ApplicationInsightsService;
  currentUser: User;
  userData: UserData;
  loading = false;
  submitted = false;
  dargas = ['תואר ראשון', 'תואר שני', 'תואר שלישי', 'מורה בכיר'];
  vetekDetails = false;

  @Output() step01Done = new EventEmitter();

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
    
    this.userData = this.helpers.getCurrentUserData();
    if(!this.userData || !this.userData.userid){
      this.userData = new UserData();
      this.userData.userid = this.currentUser._id;
    }
  }

  onSubmit() {
    this.appInsights.trackTrace('Regstep01Component::onSubmit()');
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.helpers.setCurrentUserData(this.userData);

    //Update the user data
    this.serverApi.userDataCreate(this.userData)
      .subscribe(
        (validUserData: UserData) => {
          this.appInsights.trackTrace('Regstep01Component: userDataCreate success!');
          this.helpers.setCurrentUserData(validUserData);
          this.currentUser.fullyregestered = true;
          this.loading = false;
          this.serverApi.updateUser(this.currentUser);
        },
        (error: AppError) => {
          this.appInsights.trackException(`Regstep01Component: ${JSON.stringify(error)}`);
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
