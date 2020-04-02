import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { EMPTY, throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../app-error';
import { User } from '../models/user';
import { Group } from '../models/group';
import { Chore } from '../models/chore';
import { Helpers } from '../components/helpers';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  url = "http://localhost:3000";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private httpClient: HttpClient,
    private helpers: Helpers) { 
    
    if(this.helpers.getCurrentUser() == null){
      this.clearUser();
    }
    this.currentUserSubject = new BehaviorSubject<User>(this.helpers.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public logout(){
    this.clearUser();
    this.currentUserSubject.next(this.helpers.getCurrentUser());
  }

  clearUser(){
    this.helpers.clearCurrentUser();
    this.helpers.clearToken();
    this.helpers.clearCurrentUserData();
  }

  getAuthHttpOptions(){
    //*@@*/console.log('token:', this.helpers.getToken());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.helpers.getToken()
      })
    };

    return httpOptions;
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
          this.helpers.setCurrentUserJSON(JSON.stringify(res.body));
          this.currentUserSubject.next(res.body as User);
          this.helpers.setToken(res.headers.get('x-auth-token'));
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

    return this.httpClient.post(url, JSON.stringify(user), httpOptions)
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

  groupCreate(group: Group){
    const url = this.url + '/api/groups';
    return this.httpClient.post(url, JSON.stringify(group), this.getAuthHttpOptions());
  }

  groupUpdate(group: Group){
    const url = this.url + '/api/groups/' + group._id;
    return this.httpClient.put(url, JSON.stringify(group), this.getAuthHttpOptions());
  }

  groupGetUsers(Id: number){
    const url = this.url + '/api/groups/' + Id + '/users';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  groupAddUser(Id: number, userId: number){
    const url = this.url + '/api/groups/' + Id + '/addUser/' + userId;
    return this.httpClient.put(url, this.getAuthHttpOptions());
  }

  groupRemoveUser(Id: number, userId: number){
    const url = this.url + '/api/groups/' + Id + '/removeUser/' + userId;
    return this.httpClient.put(url, this.getAuthHttpOptions());
  }

  groupDelete(Id: number){
    const url = this.url + '/api/groups/' + Id;
    return this.httpClient.delete(url, this.getAuthHttpOptions());
  }

  //Chore Templates
  choreTemplatesGet(){
    const url = this.url + '/api/chore-templates';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  choreTemplateGet(Id: number){
    const url = this.url + '/api/chore-templates/' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  choreTemplateCreate(choreTemplate){
    const url = this.url + '/api/chore-templates';
    choreTemplate.creatorId = this.helpers.getCurrentUser()._id;
    return this.httpClient.post(url, JSON.stringify(choreTemplate), this.getAuthHttpOptions());
  }

  choreTemplateUpdate(choreTemplate){
    const url = this.url + '/api/chore-templates';
    return this.httpClient.put(url, JSON.stringify(choreTemplate), this.getAuthHttpOptions());
  }

  choreTemplateDelete(Id: number){
    const url = this.url + '/api/chore-templates/' + Id;
    return this.httpClient.delete(url, this.getAuthHttpOptions());
  }

  //Chores
  choresGet(){
    const url = this.url + '/api/chores';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  //Get all chores where I am slave
  choresGetMine(){
    const url = this.url + '/api/chores/mine/' + this.helpers.getCurrentUser()._id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  //Get all chores where I am master or slave
  choresGetMe(){
    const url = this.url + '/api/chores/me/' + this.helpers.getCurrentUser()._id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  choreGet(Id: number){
    const url = this.url + '/api/chores/' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  choreCreate(chore){
    const url = this.url + '/api/chores';
    return this.httpClient.post(url, JSON.stringify(chore), this.getAuthHttpOptions());
  }

  choreUpdate(Id: number, chore){
    const url = this.url + '/api/chores/' + Id;
    return this.httpClient.put(url, JSON.stringify(chore), this.getAuthHttpOptions());
  }

  choreDelete(Id: number){
    const url = this.url + '/api/chores/' + Id;
    return this.httpClient.delete(url, this.getAuthHttpOptions());
  }
}
