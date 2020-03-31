import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Group } from 'src/app/models/group';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { Helpers } from '../helpers';

@Component({
  selector: 'cm-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  @Input() group: Group;
  @Input() color: String;
  users: User[] = [];
  selected: User[] = [];
  submitted = false;
  loading = false;

  @Output() edited = new EventEmitter<Group>();
  @Output() canceled = new EventEmitter();

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.alertService.clear();
    this.getUsers().then(() => {
      this.findGroupSlaves();
    });
  }

  sortUsers(){
    this.users.sort(function(a, b) {
      return a.name>b.name?1:a.name<b.name?-1:0;
    })
  }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
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
            
            resolve(resUsers);
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
    });
  }

  findGroupSlaves(){
    //Pre-fill the group's current members
    let tempSelected:User[] = [];
    this.group.slaveIds.forEach(slaveId =>{
      let slave = this.users.find(u => u._id === slaveId);
      if(slave){
        tempSelected.push(slave);
      }

      //We cannot push item directly to 'this.selected' because:
      //"Ng-select component implements OnPush change detection 
      //which means the dirty checking checks for immutable data types"
      this.selected = tempSelected;
    });
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

    //Update the group
    this.serverApi.groupUpdate(this.group)
      .subscribe(
        (validGroup: Group) => {
          this.submitted = false;
          this.loading = false;
          this.edited.emit(validGroup);
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
