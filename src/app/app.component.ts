import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { ServerApiService } from './services/server-api.service';

@Component({
  selector: 'pc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chore Master';
  currentUser: User;

  constructor(
    private router: Router,
    private serverApi: ServerApiService) { }

  ngOnInit() {
      this.serverApi.currentUser.subscribe(userData => {
        this.currentUser = userData;
      });

      if(!this.currentUser || !this.currentUser.name){
        this.router.navigate(['/login']);
      }
  }

  logout() {
      this.serverApi.logout();
  }

  login() {
    this.router.navigate(['/login']);
  }
}