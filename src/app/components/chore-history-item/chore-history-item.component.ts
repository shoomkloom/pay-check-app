import { Component, OnInit, Input } from '@angular/core';
import { Chore } from 'src/app/models/chore';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { AppError } from 'src/app/app-error';
import { Helpers } from '../helpers';

@Component({
  selector: 'cm-chore-history-item',
  templateUrl: './chore-history-item.component.html',
  styleUrls: ['./chore-history-item.component.css']
})
export class ChoreHistoryItemComponent implements OnInit {
  @Input() chore: Chore;
  masterUser: User = new User('loading...');
  slaveUser: User = new User('loading...');

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    const me = this.helpers.getCurrentUser();
    if(this.chore.masterId === me._id){
      this.masterUser = me;
      this.masterUser.name = 'Me';
    }
    else{
      this.getMasterUser();
    }
    if(this.chore.slaveId === me._id){
      this.slaveUser = me;
      this.slaveUser.name = 'Me';
    }
    else{
      this.getSlaveUser();
    }
  }

  getMasterUser(){
    this.serverApi.userGet(this.chore.masterId)
      .subscribe(
        (masterUser: User) => {
          this.masterUser = masterUser;
        },
        (error: AppError) => {
          console.log('ERROR:', error);
          if(error.status === 401){
            this.alertService.error('Unauthorised, please login again!');
          }
          else{
            this.alertService.error('There was an unexpected error, please try again.');
          }
        }
      )
  }

  getSlaveUser(){
    this.serverApi.userGet(this.chore.masterId)
      .subscribe(
        (slaveUser: User) => {
          this.slaveUser = slaveUser;
        },
        (error: AppError) => {
          console.log('ERROR:', error);
          if(error.status === 401){
            this.alertService.error('Unauthorised, please login again!');
          }
          else{
            this.alertService.error('There was an unexpected error, please try again.');
          }
        }
      )
  }
}
