import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { EMPTY, throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../app-error';
import { User } from '../models/user';
import { Helpers } from '../components/helpers';
import _ from "lodash";
import { AlertService } from './alert.service';
import { ApplicationInsightsService } from './application-insights.service';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  url = 'https://pay-check-server.azurewebsites.net';//@@'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private promiseUser: User;

  constructor(
    private alertService: AlertService,
    private httpClient: HttpClient,
    private helpers: Helpers,
    private appInsights: ApplicationInsightsService
  ){
    this.currentUserSubject = new BehaviorSubject<User>(this.helpers.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentUser.subscribe(user => {
      this.promiseUser = user;
    });
  }

  public logout(){
    this.appInsights.trackTrace('ServerApiService::logout()');

    this.appInsights.clearUserId();
    this.clearUser();
  }

  clearUser(){
    this.appInsights.trackTrace('ServerApiService::clearUser()');

    this.currentUserSubject.next(null);
    this.helpers.clearCurrentUser();
    this.helpers.clearCurrentUserData();
  }

  getAuthHttpOptions(){
    this.appInsights.trackTrace('ServerApiService::getAuthHttpOptions()');
    //*@@*/console.log('getAuthHttpOptions token:', this.promiseUser.token);
    
    if(!this.promiseUser.token){
      this.appInsights.trackException('ServerApiService:getAuthHttpOptions: ERROR! token is null!');
      this.alertService.error('Token is null!');
      console.log('getAuthHttpOptions: ERROR! token is null!');
      throw new Error('getAuthHttpOptions: ERROR! token is null!');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.promiseUser.token
      })
    };

    return httpOptions;
  }

  updateUser(user: User){
    this.appInsights.trackTrace('ServerApiService::updateUser(.)');

    if(!user.token){
      user.token = this.promiseUser.token;
    }

    this.currentUserSubject.next(user);
    this.helpers.setCurrentUser(user);

    if(!this.promiseUser.token){
      this.appInsights.trackException('ServerApiService:updateUser: ERROR! token is null!');
      console.log('ServerApiService::updateUser: ERROR! token is null!');
      throw new Error('ServerApiService::updateUser: ERROR! token is null!');
    }
  }

  //Auth
  authGetValidUser(user: User){
    //@@this.appInsights.trackTrace('ServerApiService::authGetValidUser(.)');

    const url = this.url + '/api/auth';

    //We need to observe the response so we can get the jwt token from the response header
    return this.httpClient.post(
      url, 
      JSON.stringify(user), 
      {headers: new HttpHeaders({'Content-Type': 'application/json'}), observe: "response"})
      .pipe(
        map((res: HttpResponse<Object>) => {
          //Store user details and jwt token in local storage to keep user logged in between page refreshes
          let validUser = res.body as User;

          if(!validUser.token){
            console.error(`ServerApiService::authGetValidUser validUser.token = null! headers=${JSON.stringify(res.headers)}`);
          }

          this.updateUser(validUser);
          console.log(`ServerApiService::authGetValidUser Login successfull for ${validUser.email}`);
          this.appInsights.setUserId(validUser.email);
          return res.body as User;
        }),
        catchError( err => {
          console.error(`ServerApiService::authGetValidUser EXCEPTION: ${err}`);
          return throwError(new AppError(err.status));
        })
      );
  }

  //Users
  userRegister(user){
    this.appInsights.trackTrace('ServerApiService::userRegister(.)');

    const url = this.url + '/api/users';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.httpClient.post(url, _.omit(user, ['token']), httpOptions)
      .pipe(catchError( err => {
            if (err.status == 401) {
                return EMPTY;
            } else {
                return throwError(new AppError(err.status));
            }
        })
      );
  }

  usersGet(){
    this.appInsights.trackTrace('ServerApiService::usersGet()');

    const url = this.url + '/api/users';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  userGet(Id: number){
    this.appInsights.trackTrace('ServerApiService::usersGet(.)');

    const url = this.url + '/api/users/' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  userPut(user){
    this.appInsights.trackTrace('ServerApiService::userPut(.)');

    const url = this.url + '/api/users/' + user._id;
    return this.httpClient.put(url, _.omit(user, ['token']), this.getAuthHttpOptions());
  }

  //UserDatas
  userDataCreate(userData){
    this.appInsights.trackTrace('ServerApiService::userDataCreate(.)');

    const url = this.url + '/api/user-datas';
    return this.httpClient.post(url, JSON.stringify(userData), this.getAuthHttpOptions());
  }

  userDatasGet(){
    this.appInsights.trackTrace('ServerApiService::userDatasGet()');

    const url = this.url + '/api/userdatas';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  userDataGet(userid: number){
    this.appInsights.trackTrace('ServerApiService::userDataGet(.)');

    const url = this.url + '/api/userdatas/' + userid;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  userDataUpdate(userData){
    this.appInsights.trackTrace('ServerApiService::userDataUpdate(.)');

    const url = this.url + '/api/user-datas/' + userData.userid;
    return this.httpClient.put(url, JSON.stringify(userData), this.getAuthHttpOptions());
  }

  userDataDelete(Id: number){
    this.appInsights.trackTrace('ServerApiService::userDataDelete(.)');

    const url = this.url + '/api/user-datas/' + Id;
    return this.httpClient.delete(url, this.getAuthHttpOptions());
  }
}
