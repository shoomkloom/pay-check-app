import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { ServerApiService } from '../../services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'pc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.clear();    
    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }

  tabClicked(tabName){
    this.alertService.clear();
  }
}
