import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { UserData } from 'src/app/models/user-data';
import { Helpers } from '../helpers';
import { User } from 'src/app/models/user';

@Component({
  selector: 'pc-regstep01',
  templateUrl: './regstep01.component.html',
  styleUrls: ['./regstep01.component.css']
})
export class Regstep01Component implements OnInit {
  currentUser: User;
  userData: UserData;
  loading = false;
  submitted = false;
  hachsharas = ['תואר ראשון', 'תואר שני', 'תואר שלישי', 'מורה בכיר'];

  @Output() step01Done = new EventEmitter();

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
    if(!this.userData){
      this.userData = new UserData();
      this.userData.fullyregestered = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.userData.userid = this.currentUser._id;
    this.helpers.setCurrentUserData(this.userData);

    this.submitted = false;
    this.loading = false;

    this.step01Done.emit();

/*@@    
    //Update the user data
    this.serverApi.userDataUpdate(this.userData)
      .subscribe(
        (validUserData: UserData) => {
          this.submitted = false;
          this.loading = false;
          this.helpers.setCurrentUserData(validUserData);
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
@@*/      
  }
}
