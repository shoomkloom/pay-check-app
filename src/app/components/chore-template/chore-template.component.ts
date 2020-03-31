import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChoreTemplate } from '../../models/choreTemplate';
import { User } from '../../models/user';
import { ServerApiService } from '../../services/server-api.service';
import { AppError } from '../../app-error';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'cm-chore-template',
  templateUrl: './chore-template.component.html',
  styleUrls: ['./chore-template.component.css']
})
export class ChoreTemplateComponent implements OnInit {
  @Input() choreTemplate: ChoreTemplate;
  @Input() index: Number;
  @Output() assigned = new EventEmitter<ChoreTemplate>();
  masterUser: User;

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.clear();
    this.getMasterUser();
  }

  getMasterUser(){
    this.serverApi.userGet(this.choreTemplate.creatorId)
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

  onAssign(){
    //Assign a chore from this template
    this.assigned.emit(this.choreTemplate);
  }
}
