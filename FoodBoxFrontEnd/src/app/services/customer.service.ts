import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private BASEURL = "http://localhost:9000/customer";


  constructor(private http: HttpClient) { }

  

  addCustomer(customer:Customer):Observable<Object>{
    return this.http.post(`${this.BASEURL}`,customer);
    
  }
  getCustomer(cust_email:string):Observable<Customer>{
    return this.http.get<Customer>(`${this.BASEURL}/${cust_email}`) 

  }

  customerLogin(loginData:any):Observable<Object>{
    return this.http.post(`${this.BASEURL}/${loginData.email}`,loginData);
  }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.BASEURL}`) 

  }
  searchCustomer(keyword:any):Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.BASEURL}/search/${keyword}`); 

  }
  deleteCustomer(email:string):Observable<Customer>{
    return this.http.delete<Customer>(`${this.BASEURL}/${email}`);

  }

}
