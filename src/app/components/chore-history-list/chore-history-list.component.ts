import { Component, OnInit } from '@angular/core';
import { Chore } from 'src/app/models/chore';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Helpers } from '../helpers';
import { AppError } from 'src/app/app-error';
import { ChoreListFilters } from 'src/app/pipes/chore-list-filter';

@Component({
  selector: 'cm-chore-history-list',
  templateUrl: './chore-history-list.component.html',
  styleUrls: ['./chore-history-list.component.css']
})
export class ChoreHistoryListComponent implements OnInit {
  chores: Chore[] = [];
  choreFilters: ChoreListFilters = {Pending:true, Done:true, Reject:true, Master:true, Slave:true};  

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    if(this.helpers.getChoreListFilters()){
      this.choreFilters = this.helpers.getChoreListFilters();
    }
    this.getChores();
  }

  getChores(){
    this.serverApi.choresGetMe()
      .subscribe(
        (resChores: Chore[]) => {
          this.chores = resChores;
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
