import { Injectable } from '@angular/core';
import {Cart} from '../models/cart';
import { BehaviorSubject , Observable} from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any= []
  public productList = new BehaviorSubject<any>([]);
  public cart : Cart;
  private BASEURL = "http://localhost:9000/cart"

    

  constructor(private http : HttpClient) { }
   
  //addting item into cart
  addToCart(cart:any):Observable<any>{
    return this.http.post(`${this.BASEURL}`,cart);
  }
  
  //get the product
  getProduct(){
    return this.productList.asObservable();

  }

  getCartItemList():Observable<Cart[]>{
    return this.http.get<Cart[]>(`${this.BASEURL}`);
  }
  deleteItem(id:any):Observable<Cart>{
    return this.http.delete<Cart>(`${this.BASEURL}${id}`);
  }
  deleteAllCart():Observable<Cart>{
    return this.http.delete<Cart>(`${this.BASEURL}`);
  }
  lessOneCart(id:any,cart:Cart):Observable<Object>{
    return this.http.put<Cart>(`${this.BASEURL}/remove/${id}`,cart);

  }
  addOneCard(id:any, cart:Cart):Observable<Object>{
    return this.http.put<Cart>(`${this.BASEURL}/add/${id}`,cart);

  }

}
  


