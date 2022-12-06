import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private BASEURL = "http://localhost:9000/purchase"
   
  constructor(private http: HttpClient) { }

  getCustomerOrders(email:string):Observable<Purchase[]>{
    return this.http.get<Purchase[]>(`${this.BASEURL}/email/${email}`);

  }

  getAllPurchase():Observable<Purchase[]>{
    return this.http.get<Purchase[]>(`${this.BASEURL}`);

  }

  deletePurchase(id: any):Observable<Purchase>{
    return this.http.delete<Purchase>(`${this.BASEURL}/${id}`);

  }
  searchPurchase(keyword: string):Observable<Purchase[]>{
    return this.http.get<Purchase[]>(`${this.BASEURL}/search/${keyword}`);

  }
  buyProducts(buyProdMap:any):Observable<Object>{
    return this.http.post(`${this.BASEURL}`,buyProdMap);

  }

}
