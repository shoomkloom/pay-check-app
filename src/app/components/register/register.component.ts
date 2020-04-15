import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../services/server-api.service';
import { AlertService } from '../../services/alert.service';
import { AppError } from '../../app-error';
import { Helpers } from '../helpers';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User;
  loading = false;
  submitted = false;
 
  constructor(
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.alertService.clear();    
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.user.fullyregestered = false;

    //Auth the user
    this.serverApi.userRegister(this.user)
      .subscribe(
        (validUser: User) => {
          this.alertService.success('הרשמה הצליחה', true);
          this.serverApi.updateUser(validUser);
          this.router.navigate(['/login']);
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
