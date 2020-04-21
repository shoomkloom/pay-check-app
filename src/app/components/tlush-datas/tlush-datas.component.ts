import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { NodeWithI18n } from '@angular/compiler';

@Component({
  selector: 'pc-tlush-datas',
  templateUrl: './tlush-datas.component.html',
  styleUrls: ['./tlush-datas.component.css']
})
export class TlushDatasComponent implements OnInit {
  currentUser: User;
  loaded = false;
  createdDate: Date;
  
  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.clear();  

    this.serverApi.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    setTimeout (() => {
      this.createdDate = new Date(Date.now());
      this.loaded = true;
   }, 2000);
  }
}
