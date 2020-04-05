import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/user-data';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Helpers } from '../helpers';
import { AppError } from 'src/app/app-error';

@Component({
  selector: 'pc-regstep03',
  templateUrl: './regstep03.component.html',
  styleUrls: ['./regstep03.component.css']
})
export class Regstep03Component implements OnInit {
  currentUser: User;
  userData: UserData;
  loading = false;
  submitted = false;

  //@@@Output() step03Done = new EventEmitter();

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.alertService.clear();  

    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });

    this.userData = this.helpers.getCurrentUserData();
    if(!this.userData || !this.userData.userid){
      this.userData = new UserData();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.currentUser.fullyregestered = true;
    this.helpers.setCurrentUserData(this.userData);

    this.submitted = false;
    this.loading = false;

    //Update the user data
    this.serverApi.userDataCreate(this.userData)
      .subscribe(
        (validUserData: UserData) => {
          this.updateUserRegisterd();
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

  updateUserRegisterd(){
    // reset alerts on submit
    this.alertService.clear();

    let tempUser = JSON.parse(JSON.stringify(this.currentUser));
    tempUser.fullyregestered = true;

    //Update the user data
    this.serverApi.userPut(tempUser)
      .subscribe(
        (validUser: User) => {
          this.serverApi.updateUser(validUser); //Update the current user instance in serverApi
          this.helpers.setCurrentUser(this.currentUser);
          this.submitted = false;
          this.loading = false;
          this.alertService.success('ההרשמה הסתיימה בהצלחה.');
          //@@this.step03Done.emit();
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
