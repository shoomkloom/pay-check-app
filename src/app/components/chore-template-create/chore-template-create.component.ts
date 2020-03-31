import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ChoreTemplate } from '../../models/choreTemplate';
import { AlertService } from '../../services/alert.service';
import { ServerApiService } from '../../services/server-api.service';
import { AppError } from '../../app-error';

@Component({
  selector: 'cm-chore-template-create',
  templateUrl: './chore-template-create.component.html',
  styleUrls: ['./chore-template-create.component.css']
})
export class ChoreTemplateCreateComponent implements OnInit {
  choreTemplate = new ChoreTemplate();
  submitted = false;
  loading = false;

  @Output() created = new EventEmitter<ChoreTemplate>();
  @Output() canceled = new EventEmitter();

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.clear();
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.serverApi.choreTemplateCreate(this.choreTemplate)
      .subscribe(
        (validChoreTemplate: ChoreTemplate) => {
          this.submitted = false;
          this.loading = false;
          this.created.emit(validChoreTemplate);
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
