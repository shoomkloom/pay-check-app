import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chore } from 'src/app/models/chore';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';

@Component({
  selector: 'cm-chore-item',
  templateUrl: './chore-item.component.html',
  styleUrls: ['./chore-item.component.css']
})
export class ChoreItemComponent implements OnInit {
  @Input() chore: Chore;
  @Input() color: String;
  comment: string;

  @Output() edited = new EventEmitter<Chore>();
  
  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.comment = this.chore.comment;
    if(!this.comment){
      this.comment = '';
    }
  }

  onDone(){
    this.chore.state = 'Done';
    this.chore.comment = this.comment;
    this.submitChore();
  }

  onReject(){
    this.chore.state = 'Reject';
    this.chore.comment = this.comment;
    this.submitChore();
  }

  submitChore(){
      // reset alerts on submit
      this.alertService.clear();
  
      //Update the chore
      this.serverApi.choreUpdate(this.chore._id, this.chore)
        .subscribe(
          (updatedChore: Chore) => {
            this.edited.emit(updatedChore);
          },
          (error: AppError) => {
            console.log('ERROR:', error);
            if(error.status === 400 || error.status === 401){
              this.alertService.error('Unauthorised, please login again!');
            }
            else{
              this.alertService.error('There was an unexpected error, please try again.');
            }
          }
        )
  }
}
