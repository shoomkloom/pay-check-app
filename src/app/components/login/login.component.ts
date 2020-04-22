import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ServerApiService } from '../../services/server-api.service';
import { AppError } from '../../app-error';
import { User } from 'src/app/models/user';
import { ApplicationInsightsService } from 'src/app/services/application-insights.service';

@Component({
  selector: 'pc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appInsights: ApplicationInsightsService;
  user: User = new User;
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
  }

  onSubmit() {
    this.appInsights.trackTrace('LoginComponent::onSubmit()');
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    //Auth the user
    this.serverApi.authGetValidUser(this.user)
      .subscribe(
        (validUser: User) => {
          this.appInsights.setUserId(validUser.email);
          this.appInsights.trackTrace('LoginComponent: authGetValidUser success!');
          this.submitted = false;
          this.loading = false;
          this.router.navigate(['/']);
        },
        (error: AppError) => {
          this.appInsights.trackException(`LoginComponent: ${JSON.stringify(error)}`);
          console.log('ERROR:', error);
          if(error.status === 400 || error.status === 401){
            this.alertService.error(`(${error.status}) שם משתמש או סיסמה לא תקינים.`);
          }
          else{
            this.alertService.error(`(${error.status}) תקלה לא מזוהה, בבקשה לנסות שוב.`);
          }
          this.loading = false;
        }
      )
  }
}
