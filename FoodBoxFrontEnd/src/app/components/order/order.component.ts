import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Customer } from 'src/app/models/customer';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customer: Customer = new Customer();
  cust_email : string;
  cartItems: Cart[];
  total : number;
  grandTotal : number;
  todayDate : any;
  transId: string;
  login : number = 0;



  constructor(
    private customerService : CustomerService,
    private cartService: CartService,
    private logService: LogService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.logService.sendHeader(1);
    this.logService.loggeduserId.subscribe(
      (id) =>{
        if(this.login = 0){
          this.router.navigate(['']);
        }
      }
    );
    this.getCartitemList();
    this.cust_email = localStorage.getItem('cust_email');
    this.customerService.getCustomer(this.cust_email).subscribe(data =>{
      this.customer = data;
      console.log(this.cust_email);
    })
    
    this.cartService.deleteAllCart().subscribe(data =>{
      console.log('');
      
    })
    this.total = Number(localStorage.getItem('grandTotal'));
    this.grandTotal = this.total + 39;
    this.todayDate = formatDate(new Date(), 'dd MMM, yyyy','en');
    this.transId = localStorage.getItem('transId');
  }
  private getCartitemList() {
  this.cartService.getCartItemList().subscribe(data =>{
    this.cartItems = data;
    console.log(this.cartItems);
    
  })
}

  printOrder(){
    window.print();
  }

}
