import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ServerApiService } from '../../services/server-api.service';
import { AppError } from '../../app-error';
import { User } from 'src/app/models/user';

@Component({
  selector: 'pc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.clear();    
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    //Auth the user
    this.serverApi.authGetValidUser(this.user)
      .subscribe(
        (validUser: User) => {
          this.submitted = false;
          this.loading = false;
          this.router.navigate(['/']);
        },
        (error: AppError) => {
          console.log('ERROR:', error);
          if(error.status === 400 || error.status === 401){
            this.alertService.error('כניסה לא הצליחה, בבקשה לנסות שוב.');
          }
          else{
            this.alertService.error('תקלה לא מזוהה, בבקשה לנסות שוב.');
          }
          this.loading = false;
        }
      )
  }
}
