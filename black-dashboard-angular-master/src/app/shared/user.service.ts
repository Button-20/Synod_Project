import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isOnline: boolean = false;

  users: User[];
  selectedUser : User;
  count: any;
  ministerscount: any;
  laycount: any;
  visitorscount: any;
  
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};
  
  constructor(private http: HttpClient, private router: Router) { }
  
  
  // Actions that can be done to user
  login(authCredentials){
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  getuserList(){
    return this.http.get(environment.apiBaseUrl + '/users');
  }
  
  getAllUserCount(){
    return this.http.get(environment.apiBaseUrl + '/user/all');
  }

  getAllPositionMinistersCount(){
    return this.http.get(environment.apiBaseUrl + '/user/ministerscountall');
  }

  getAllPositionLayCount(){
    return this.http.get(environment.apiBaseUrl + '/user/laycountall');
  }

  getAllPositionVisitorsCount(){
    return this.http.get(environment.apiBaseUrl + '/user/visitorscountall');
  }
  
  putUser(user: User){
    return this.http.put(environment.apiBaseUrl + `/users/${user._id}`, user);
  }

  putUserLoginPermission(user: User){
    return this.http.put(environment.apiBaseUrl + `/userspermission/${user._id}`, user);
  }
  
  deleteUser(_id: string){
    return this.http.delete(environment.apiBaseUrl + `/users/${_id}`);
  }
  

  // End of Actions
  
  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
