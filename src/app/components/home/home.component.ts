import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { ServerApiService } from '../../services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Helpers } from '../helpers';

@Component({
  selector: 'pc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.alertService.clear();    
    
    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }
}
