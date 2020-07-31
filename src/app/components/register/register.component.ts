import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../services/server-api.service';
import { AlertService } from '../../services/alert.service';
import { AppError } from '../../app-error';
import { Helpers } from '../helpers';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ApplicationInsightsService } from 'src/app/services/application-insights.service';

@Component({
  selector: 'pc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    this.appInsights.trackTrace('RegisterComponent::onSubmit()');
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.user.fullyregestered = false;

    //Auth the user
    this.serverApi.userRegister(this.user)
      .subscribe(
        (validUser: User) => {
          this.appInsights.trackTrace('RegisterComponent: userRegister success!');
          this.loading = false;
          this.router.navigate(['/login']);
        },
        (error: AppError) => {
          this.appInsights.trackException(`RegisterComponent: ${JSON.stringify(error)}`);
          console.log('ERROR:', error);
          if(error.status === 400 || error.status === 401){
            if(error.originalError == "User already registered"){
              this.alertService.error(`(${error.status}) משתמש זה כבר רשום במערכת.`);
            }
            else{
              this.alertService.error(`(${error.status}) הרשמה לא הצליחה, בבקשה לנסות שוב.`);
            }
          }
          else{
            this.alertService.error(`(${error.status}) תקלה לא מזוהה ברישום, בבקשה לנסות שוב.`);
          }
          this.loading = false;
        }
      )
  }
}
