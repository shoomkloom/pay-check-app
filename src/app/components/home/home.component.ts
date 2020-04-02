import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { ServerApiService } from '../../services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Helpers } from '../helpers';
import { UserData } from 'src/app/models/user-data';


@Component({
  selector: 'pc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  userData: UserData;

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.alertService.clear();    
    
    this.userData = this.helpers.getCurrentUserData();

    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }
}
