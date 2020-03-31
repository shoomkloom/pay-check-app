import { Component, OnInit } from '@angular/core';
import { Chore } from 'src/app/models/chore';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Helpers } from '../helpers';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AppError } from 'src/app/app-error';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'cm-chore-list',
  templateUrl: './chore-list.component.html',
  styleUrls: ['./chore-list.component.css']
})
export class ChoreListComponent implements OnInit {
  pendingChores: Chore[] = [];
  activeIds = 'toggle-my-chores';
  activeIdList: String[] = [];

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  get h(){
    return this.helpers;
  }

  ngOnInit(): void {
    this.setActiveIds();
    this.getChores();
  } 

  setActiveIds(){
    if(this.helpers.getChoreListAccordionActiveIds()){ 
      this.activeIds = this.helpers.getChoreListAccordionActiveIds();
    }
    else{
      this.helpers.setChoreListAccordionActiveIds(this.activeIds);
    }
    this.activeIdList = this.activeIds.split(',');
  }
  
  toggleAccordion( props:NgbPanelChangeEvent ): void {
    props.nextState // true === panel is toggling to an open state 
                    // false === panel is toggling to a closed state
    props.panelId   // the ID of the panel that was clicked
    //props.preventDefault(); // don't toggle the state of the selected panel 

    let index = this.activeIdList.indexOf(props.panelId);
    if(index >= 0){
      if(props.nextState == false){
        this.activeIdList.splice(index, 1);
      }
    }
    else{
      if(props.nextState == true){
        this.activeIdList.push(props.panelId);
      }
    }

    //Build 'activeIds' string
    this.activeIds = '';
    this.activeIdList.forEach((activeId, index) => {
      this.activeIds += activeId;
      if(index < this.activeIdList.length - 1){
        this.activeIds += ',';
      }
    });

    this.helpers.setChoreListAccordionActiveIds(this.activeIds);
  }

  getChores(){
    this.serverApi.choresGetMine()
      .subscribe(
        (resChores: Chore[]) => {
          this.pendingChores = [];
          resChores.forEach(value => {
            if(value.state === 'Pending'){
              this.pendingChores.push(value);
            }
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

  onChoreUpdated(updatedChore: Chore){
    this.getChores();
  }
}
