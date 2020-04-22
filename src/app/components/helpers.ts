import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserData } from '../models/user-data';
import { ApplicationInsightsService } from '../services/application-insights.service';

@Injectable({
    providedIn: 'root'
})
export class Helpers{
    colors = ['#27AE60', '#F39C12', '#7D3C98', '#1A5276', '#D35400'];
    
    constructor(
        private appInsights: ApplicationInsightsService
      ) { }

    getColor(i: number){
        let colorIndex = i;
        while(colorIndex > this.colors.length-1){
          colorIndex-=this.colors.length;
        }
    
        return this.colors[colorIndex];
    }

    setCurrentUser(user: User) {
        this.appInsights.trackTrace('Helpers::setCurrentUser(.)');
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    setCurrentUserJSON(userJSON: string){
        this.appInsights.trackTrace('Helpers::setCurrentUserJSON(.)');
        localStorage.setItem('currentUser', userJSON);
    }

    clearCurrentUser() {
        this.appInsights.trackTrace('Helpers::clearCurrentUser()');
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() : User {
        this.appInsights.trackTrace('Helpers::clearCurrentUser()');
        return (JSON.parse(localStorage.getItem('currentUser')) as User);
    }

    setCurrentUserData(userData) {
        this.appInsights.trackTrace('Helpers::setCurrentUserData(.)');
        localStorage.setItem('currentUserData', JSON.stringify(userData));
    }
    
    getCurrentUserData() : UserData {
        this.appInsights.trackTrace('Helpers::getCurrentUserData()');
        return (JSON.parse(localStorage.getItem('currentUserData')) as UserData);
    }

    clearCurrentUserData(){
        this.appInsights.trackTrace('Helpers::clearCurrentUserDatas()');
        localStorage.removeItem('currentUserData');
    }
}