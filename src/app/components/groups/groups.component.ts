import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { User } from 'src/app/models/user';
import { Helpers } from '../helpers';

@Component({
  selector: 'cm-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  creatingNew = false;
  assignChore = false;
  assignChoreUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private _helpers: Helpers
  ) { }

  get helpers(){
    return this._helpers;
  }

  ngOnInit(): void {
    this.alertService.clear();
    this.getGroups();
  }

  onNewGroup(){
    this.creatingNew = true;
  }

  sortGroups(){
    this.groups.sort(function(a, b) {
      return a.name>b.name?1:a.name<b.name?-1:0;
    })
  }

  getGroups(){
    this.serverApi.groupsGetMe(this.helpers.getCurrentUser()._id)
      .subscribe(
        (resGroups: Group[]) => {
          resGroups.forEach(value => {
            this.groups.push(value);
          });
          this.sortGroups();
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

  onGroupCreated(groupCreated: Group){
    this.groups.push(groupCreated);  
    this.sortGroups(); 
    this.creatingNew = false;
  }

  onGroupCreateCanceled(){
    this.creatingNew = false;
  }

  onChoreAssignClicked(groupUser: User){
    //Assign a chore to this user
    this.assignChoreUser = groupUser;
  }
}
