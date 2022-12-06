import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private BASEURL = "http://localhost:9000/admin"

  constructor(private http : HttpClient) { }

  adminLogin(loginData:any):Observable<Object>{
    return this.http.post(`${this.BASEURL}/$loginData.username}`,loginData)
  }



}
