import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { EMPTY, throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../app-error';
import { User } from '../models/user';
import { Helpers } from '../components/helpers';
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  url = 'https://pay-check-server.azurewebsites.net';//@@'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private promiseUser: User;

  constructor(
    private httpClient: HttpClient,
    private helpers: Helpers) { 
    
    if(this.helpers.getCurrentUser() == null){
      this.clearUser();
    }
    this.currentUserSubject = new BehaviorSubject<User>(this.helpers.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentUser.subscribe(user => {
      this.promiseUser = user;
    });
  }

  public logout(){
    this.clearUser();
    this.currentUserSubject.next(this.helpers.getCurrentUser());
  }

  clearUser(){
    this.helpers.clearCurrentUser();
    this.helpers.clearCurrentUserData();
  }

  getAuthHttpOptions(){
    //*@@*/console.log('getAuthHttpOptions token:', this.promiseUser.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.promiseUser.token
      })
    };

    return httpOptions;
  }

  updateUser(user: User){
    this.currentUserSubject.next(user);
    this.helpers.setCurrentUser(user);
  }

  //Auth
  authGetValidUser(user: User){
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
          validUser.token = res.headers.get('x-auth-token');
          this.updateUser(validUser);
          return res.body as User;
        }),
        catchError( err => {
            if (err.status == 401) {
                return EMPTY;
            } else {
                return throwError(new AppError(err.status));
            }
        })
      );
  }

  //Users
  userRegister(user){
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
    const url = this.url + '/api/users';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  userGet(Id: number){
    const url = this.url + '/api/users/' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  userPut(user){
    const url = this.url + '/api/users/' + user._id;
    return this.httpClient.put(url, _.omit(user, ['token']), this.getAuthHttpOptions());
  }

  //UserDatas
  userDataCreate(userData){
    const url = this.url + '/api/user-datas';
    return this.httpClient.post(url, JSON.stringify(userData), this.getAuthHttpOptions());
  }

  userDatasGet(){
    const url = this.url + '/api/userdatas';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  userDataGet(userid: number){
    const url = this.url + '/api/userdatas/' + userid;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  userDataUpdate(userData){
    const url = this.url + '/api/user-datas/' + userData.userid;
    return this.httpClient.put(url, JSON.stringify(userData), this.getAuthHttpOptions());
  }

  userDataDelete(Id: number){
    const url = this.url + '/api/user-datas/' + Id;
    return this.httpClient.delete(url, this.getAuthHttpOptions());
  }

  //Groups
  groupsGet(){
    const url = this.url + '/api/groups';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  groupsGetMe(masterId){
    const url = this.url + '/api/groups/me/' + masterId;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  groupGet(Id: number){
    const url = this.url + '/api/groups/' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }
}
