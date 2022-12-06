import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {  Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart : Cart = new Cart();
  public products : Cart[];
  public sortedCart : Cart[];
  public grandTotal : number = 0;
  login : number = 0;


  constructor(private cartService : CartService,
    private router: Router,
    private logService: LogService) { 
      this.products = [];
      this.sortedCart =this.products.slice();
    }

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
  }
  sortData(sort:Sort){
    const data = this.products.slice();
    if(!sort.active || sort.direction ===''){
      this.sortedCart = data;
    }
    this.sortedCart = data.sort((a,b)=>{
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
      case 'name' : return this.compare(a.product.name,b.product.name, isAsc);
      case 'category' : return this.compare(a.product.category,b.product.category, isAsc);
      case 'price' : return this.compare(a.price,b.price, isAsc);
      // case 'quantity' : return this.compare(a.quantity,b.quantity, isAsc);

      default:return 0;

      }
    })
  }
  compare(a:number|string,b:number|string, isAsc: boolean){
    return (a<b? -1 :1)* (isAsc ? 1 : -1);
  }
 

 private getCartitemList() {
     this.cartService.getCartItemList().subscribe((res:Cart[]) =>{
         this.products = res;
         this.grandTotal = 0;
         for(let i =0 ; i<this.products.length;i++){
          this.grandTotal+=this.products[i].price;

         }
         localStorage.setItem('grandTotal' , ""+this.grandTotal);
         this.sortedCart = this.products;
        
         return ;
     });
  }
  deleteItem(id:any){
    this.cartService.deleteItem(id).subscribe(res=>{
      this.getCartitemList();
    })
  }
  removeAllCart(){
    this.cartService.deleteAllCart().subscribe(res=>{
      this.getCartitemList();
    })
  }
  addOneCard(id:any , cart: Cart){
      this.cartService.addOneCard(id, cart).subscribe(res=>{
        this.getCartitemList();
      })
  }
  lessOneCart(id:any,cart:Cart){
    this.cartService.lessOneCart(id,cart).subscribe(res=>{
      this.getCartitemList();
    })
  }

}
