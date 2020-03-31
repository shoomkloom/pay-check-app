import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Group } from 'src/app/models/group';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';

@Component({
  selector: 'cm-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() group: Group;
  @Input() color: String;
  groupUsers: User[] = [];
  editing = false;
  assigning = false;
  assginedGroupUser: User = null;
  
  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.clear();
    this.getGroupUsers();
  }

  getGroupUsers(){
    this.groupUsers = [];
    this.serverApi.groupGetUsers(this.group._id)
      .subscribe(
        (resGroupUsers: User[]) => {
          resGroupUsers.forEach(value => {
            this.groupUsers.push(value);
          });
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

  onAssign(groupUser: User){
    this.assginedGroupUser = groupUser;
    this.assigning = true;
  }

  onAssignCanceled(){
    this.assginedGroupUser = null;
    this.assigning = false;
  }

  onAssignCompleted(){
    this.assginedGroupUser = null;
    this.assigning = false;
  }

  onGroupEdit(){
    this.editing = true;
  }

  onGroupEditCanceled(){
    this.editing = false;
  }

  onGroupEdited(updatedGroup: Group){
    this.group = updatedGroup;
    this.getGroupUsers();
    this.editing = false;
  }
}
