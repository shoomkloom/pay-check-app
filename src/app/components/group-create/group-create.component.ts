import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/models/group';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { User } from 'src/app/models/user';
import { Helpers } from '../helpers';

@Component({
  selector: 'cm-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  users: User[] = [];
  selected: User[] = [];
  group = new Group();
  submitted = false;
  loading = false;

  @Output() created = new EventEmitter<Group>();
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
          
          //Remove me from the list
          const meUserId = this.helpers.getCurrentUser()._id;
          const meIndex = this.users.findIndex(({ _id }) => _id === meUserId);
          if(meIndex >= 0){
            this.users.splice(meIndex, 1);
          }
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

    this.group.masterId = this.helpers.getCurrentUser()._id;

    this.group.slaveIds = [];
    this.selected.forEach(element => {
      this.group.slaveIds.push(element._id);
    });

    //Create the group
    this.serverApi.groupCreate(this.group)
      .subscribe(
        (validGroup: Group) => {
          this.submitted = false;
          this.loading = false;
          this.created.emit(validGroup);
        },
        (error: AppError) => {
          console.log('ERROR:', error);
          if(error.status === 400 || error.status === 401){
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
