import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public login = new BehaviorSubject<any>([]);
  private BASEURL = "http://localhost:9000/product";
 
  constructor(private http : HttpClient) { }

   getLogin(){
    return this.login.asObservable();
   }

   getProductList():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/cust`);
   }

   public getProductById(id : number):Observable<Product>{
    return this.http.get<Product>(`${this.BASEURL}/${id}`);
   }

   public getProductSearch(keyword : string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/search/${keyword}`);
   }

    addProduct(product : Product):Observable<Object>{
    return this.http.post(`${this.BASEURL}`,product);
   }

   updateProduct(id : number,product : Product):Observable<Object>{
    return this.http.put<Product>(`${this.BASEURL}/${id}`,product);
   }

   deleteProduct(id : number):Observable<Product>{
    return this.http.delete<Product>(`${this.BASEURL}/${id}`);
   }
   
   getFullProductList():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/admin`)
   }
   getIndian():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/indian`)
   }
   getChinese():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/chinese`)
   }
   getMaxican():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/maxican`)
   }
   getItalian():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/italian`)
   }
   getJapnese():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/japnese`)
   }
   getThai():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/thai`)
   }
   getAmerican():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/american`)
   }
   getKorean():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/korean`)
   }

}
