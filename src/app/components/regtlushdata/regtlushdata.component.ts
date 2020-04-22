import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { ApplicationInsightsService } from 'src/app/services/application-insights.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-regtlushdata',
  templateUrl: './regtlushdata.component.html',
  styleUrls: ['./regtlushdata.component.css']
})
export class RegTlushDataComponent implements OnInit {
  appInsights: ApplicationInsightsService;
  tempUser = new User();
  currentUser: User;
  loading = false;
  submitted = false;

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
  }

  onSubmit() {
    this.appInsights.trackTrace('RegTlushDataComponent::onSubmit()');

    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.currentUser.tlushusercode = this.tempUser.tlushusercode;
    this.currentUser.tlushpassword = this.tempUser.tlushpassword;

    //Update the user
    this.serverApi.userPut(this.currentUser)
      .subscribe(
        (validUser: User) => {
          this.appInsights.trackTrace('RegTlushDataComponent: userDataCreate success!');
          this.serverApi.updateUser(validUser); //Update the current user instance in serverApi
          this.submitted = false;
          this.loading = false;
          this.alertService.success('ההרשמה הסתיימה בהצלחה.');
        },
        (error: AppError) => {
          this.appInsights.trackException(`RegTlushDataComponent: ${JSON.stringify(error)}`);
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
