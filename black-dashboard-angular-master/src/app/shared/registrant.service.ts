import { HttpHeaders } from '@angular/common/http';
import { Registrant } from './registrant.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrantsService {

  selectedRegistrant : Registrant;
  registrants: Registrant[];
  count: any;
  ministerscount: any;
  laycount: any;
  visitorscount: any;
  delegatecount: any;
  observercount: any;


  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};

  constructor(private http: HttpClient) { }

  postRegistrant(registrant: Registrant){
    return this.http.post(environment.apiBaseUrl+'/registrant', registrant, this.noAuthHeader);
  }

  getRegistrantsList(){
    return this.http.get(environment.apiBaseUrl+'/getallregistrant');
  }

  getAllRegistrantsCount(){
    return this.http.get(environment.apiBaseUrl + '/registrant/countall');
  }

  putRegistrant(registrant: Registrant){
    return this.http.put(environment.apiBaseUrl+ `/registrant/${registrant._id}`, registrant);
  }

  deleteRegistrant(_id: string){
    return this.http.delete(environment.apiBaseUrl + `/user/members/${_id}`);
  }

  getAllPositionMinistersCount(){
    return this.http.get(environment.apiBaseUrl + '/registrant/ministerscountall');
  }

  getAllPositionLayCount(){
    return this.http.get(environment.apiBaseUrl + '/registrant/laycountall');
  }

  getAllPositionVisitorsCount(){
    return this.http.get(environment.apiBaseUrl + '/registrant/visitorscountall');
  }

  getAllCategoryDelegateCount(){
    return this.http.get(environment.apiBaseUrl + '/registrant/delegatecountall');
  }

  getAllCategoryObserverCount(){
    return this.http.get(environment.apiBaseUrl + '/registrant/observercountall');
  }


  getToken(){
    return localStorage.getItem('token');
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
}
