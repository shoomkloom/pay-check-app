import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Chore } from 'src/app/models/chore';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { ChoreTemplate } from 'src/app/models/choreTemplate';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Helpers } from '../helpers';

@Component({
  selector: 'cm-group-assign',
  templateUrl: './group-assign.component.html',
  styleUrls: ['./group-assign.component.css']
})
export class GroupAssignComponent implements OnInit {
  @Input() user: User;
  @Input() color: String;
  submitted = false;
  loading = false;
  choreTemplates: ChoreTemplate[] = [];
  selected: ChoreTemplate;
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
    this.getChoreTemplates();
  }

  sortCoreTemplates(){
    this.choreTemplates.sort(function(a, b) {
      return a.name>b.name?1:a.name<b.name?-1:0;
    })
  }

  getChoreTemplates(){
    this.serverApi.choreTemplatesGet()
      .subscribe(
        (reschoreTemplates: ChoreTemplate[]) => {
          this.choreTemplates = reschoreTemplates;
          this.sortCoreTemplates();  
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
      choreTemplateId: this.selected._id,
      masterId: this.helpers.getCurrentUser()._id,
      slaveId: this.user._id,
      state: 'Pending',
      date: choreDateDate
    }
        
    this.serverApi.choreCreate(chore)
      .subscribe(
        (validChore: Chore) => {
          this.submitted = false;
          this.loading = false;
          this.assigned.emit(validChore);
          this.alertService.success(`Chore '${this.selected.name}' was assigned to ${this.user.name}`);
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
