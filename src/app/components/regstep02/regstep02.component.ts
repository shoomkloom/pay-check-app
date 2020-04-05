import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/user-data';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Helpers } from '../helpers';

@Component({
  selector: 'pc-regstep02',
  templateUrl: './regstep02.component.html',
  styleUrls: ['./regstep02.component.css']
})
export class Regstep02Component implements OnInit {
  userData: UserData;
  loading = false;
  submitted = false;
  vetekformalystart: number;
  
  @Output() step02Done = new EventEmitter();

  constructor(
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.alertService.clear();  

    this.userData = this.helpers.getCurrentUserData();
    if(!this.userData || !this.userData.userid){
      this.userData = new UserData();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.userData.vetekformalystart = this.vetekformalystart.toString();
    this.helpers.setCurrentUserData(this.userData);

    this.submitted = false;
    this.loading = false;

    this.step02Done.emit();
  }
}
