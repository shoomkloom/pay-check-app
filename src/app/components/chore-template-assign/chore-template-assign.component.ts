import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChoreTemplate } from '../../models/choreTemplate';
import { ServerApiService } from '../../services/server-api.service';
import { AlertService } from '../../services/alert.service';
import { AppError } from '../../app-error';
import { User } from 'src/app/models/user';
import { Chore } from 'src/app/models/chore';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Helpers } from '../helpers';

@Component({
  selector: 'cm-chore-template-assign',
  templateUrl: './chore-template-assign.component.html',
  styleUrls: ['./chore-template-assign.component.css']
})
export class ChoreTemplateAssignComponent implements OnInit {
  @Input() choreTemplate: ChoreTemplate;
  submitted = false;
  loading = false;
  users: User[] = [];
  selected: User;
  choreDate: NgbDateStruct;

  @Output() assigned = new EventEmitter<Chore>();
  @Output() canceled = new EventEmitter();

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.alertService.clear();
    this.getUsers();
  }

  sortUsers(){
    this.users.sort(function(a, b) {
      return a.name>b.name?1:a.name<b.name?-1:0;
    })
  }

  getUsers(){
    this.serverApi.usersGet()
      .subscribe(
        (resUsers: User[]) => {
          this.users = resUsers;
          this.sortUsers();  
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

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    let choreDateDate = new Date(this.choreDate.year, this.choreDate.month-1, this.choreDate.day);

    let chore = {
      choreTemplateId: this.choreTemplate._id,
      masterId: this.helpers.getCurrentUser()._id,
      slaveId: this.selected._id,
      state: 'Pending',
      date: choreDateDate
    }
        
    this.serverApi.choreCreate(chore)
      .subscribe(
        (validChore: Chore) => {
          this.submitted = false;
          this.loading = false;
          this.assigned.emit(validChore);
          this.alertService.success(`Chore '${this.choreTemplate.name}' was assigned to ${this.selected.name}`);
        },
        (error: AppError) => {
          console.log('ERROR:', error);
          if(error.status === 400){
            this.alertService.error('Invalid name or details!');
          }
          else if(error.status === 401){
            this.alertService.error('Unauthorised, please login again!');
          }
          else{
            this.alertService.error('There was an unexpected error, please try again.');
          }
          this.loading = false;
        }
      )
  }

  onCancel(){
    this.canceled.emit();
  }

}
