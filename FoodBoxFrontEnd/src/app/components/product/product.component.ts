import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { LogService } from 'src/app/services/log.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'; 



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  cart: Cart = new Cart();
  login: number = 0;
  products: Product[];
  setAutoHide: boolean = true;
  autoHide: number = 2000;


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private logService: LogService,
  ) { }

  ngOnInit(): void {
    this.logService.sendHeader(1);
    this.getProducts();
    
    this.productService.login.subscribe(res => {
      this.login = res;
      console.log(this.login);

    })


  }
  public getProducts() {
    this.productService.getProductList().subscribe(data => {
      this.products = data;
    });
  }
  addToCart(product: any) {
    this.cart.product = product;
    this.cartService.addToCart(this.cart).subscribe(data => {
      console.log(data);

    })
    Swal.fire({
        icon : "success",
        title: "Your food is added to cart",
        text: "View cart to checkout"


  })
    
  }
  showToLogin(){
    Swal.fire({
      icon: 'error',
      title: "Please Login",
      text: "plase login first for adding this food into cart"
    })
  }
  

}
