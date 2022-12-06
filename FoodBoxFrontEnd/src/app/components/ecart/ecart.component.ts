import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-ecart',
  templateUrl: './ecart.component.html',
  styleUrls: ['./ecart.component.css']
})
export class EcartComponent implements OnInit {
  // public cart : Cart = new Cart();
  // public products : Cart[];
  // public sortedCart : Cart[];
  // public grandTotal : number = 0;


  // constructor(private cartService : CartService,
  //   private router: Router,
  //   private logService: LogService) { 
  //     this.products = [];
  //     this.sortedCart =this.products.slice();
  //   }

  ngOnInit(): void {
    // this.logService.sendHeader(1);
    // this.logService.loggedAdminId$.subscribe(
    //   (id) =>{
    //     if(id==''){
    //       this.router.navigate(['']);
    //     }
    //   }
    // );
    // this.getCartitemList();
  }

//  private getCartitemList() {
//      this.cartService.getCartItemList().subscribe((res:Cart[]) =>{
//          this.products = res;
//          this.grandTotal = 0;
//          for(let i =0 ; i<this.products.length;i++){
//           this.grandTotal+=this.products[i].price;

//          }
//          sessionStorage.setItem('grandTotal' , ""+this.grandTotal);
//          this.sortedCart = this.products;
//      });
//   }
//   deleteItem(id:any){
//     this.cartService.deleteItem(id).subscribe(res=>{
//       this.getCartitemList();
//     })
//   }
//   removeAllCart(){
//     this.cartService.deleteAllCart().subscribe(res=>{
//       this.getCartitemList();
//     })
//   }
//   updateCart(id:any , cart: Cart){
//       this.cartService.updateCart(id, cart).subscribe(res=>{
//         this.getCartitemList();
//       })
//   }
//   lestOneCart(id:any,cart:Cart){
//     this.cartService.lessOneCart(id,cart).subscribe(res=>{
//       this.getCartitemList();
//     })
//   }

}
