import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { LogService } from 'src/app/services/log.service';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Purchase } from 'src/app/models/purchase';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader : number = 0;
  
  currentCustomer : Customer;
  customer : Customer[] =[];

 
  login: number = 0;
  public cart: Cart = new Cart();
  public product : Cart[];
  public activeOrders: Purchase[]=[];
  public totalItem: number =0;
  productList: any
  searchKey: string;
  products: Product[];
  
  
  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private logService: LogService,
    private purchaseService: PurchaseService,
    private router : Router,
    private cartService: CartService

  ) {
      this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
   }

  ngOnInit(): void {
    this.logService.headerId$.subscribe((id)=>{
      this.showHeader = id;
    })
    localStorage.setItem('cust_email', null);
    this.cartService.deleteAllCart().subscribe(res=>{
      console.log('deletedAllCart');
    });
    this.cartService.getProduct().subscribe(res =>{
      this.product = res;
      this.totalItem = this.product.length;
    });
    this.productService.getProductList().subscribe(res=>{
      this.productList = res;
    });
   
    this.productService.login.subscribe(res => {
      this.login = res;
      console.log(this.login);

    })
    

  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(data =>{
      this.customer = data;
    })
  }
  goToProducts() {
    this.router.navigate(['/home']);
  }
 
  logout(){
    this.login = 0;
    this.cartService.deleteAllCart().subscribe(data =>{
      console.log('cart_empty');
      
    });
    localStorage.setItem('cust_email',null);
    this.logService.sendId('');
  }
  Orders(email:string){
    email =localStorage.getItem("cust_email");
    this.purchaseService.getCustomerOrders(email).subscribe(data =>{
      this.activeOrders = data
    })
  }
  Search() {
    if (this.searchKey == "") {
      this.ngOnInit();
    }
    else {
      this.productService.getProductSearch(this.searchKey).subscribe(data => {
        this.products = data
      })
    }
  }
  public getProducts() {
    this.productService.getProductList().subscribe(data => {
      this.products = data;
    });
  }
  showToLogin() {
    Swal.fire({
      icon: 'error',
      title: "Please Login first"
    })
  }
  categoryChinese() {
    this.productService.getChinese().subscribe(data => {
      this.products = data;
    })
  }
  categoryThai() {
    this.productService.getThai().subscribe(data => {
      this.products = data;
    })
  }
  categoryAmerican() {
    this.productService.getAmerican().subscribe(data => {
      this.products = data;
    })
  }
  categoryMaxican() {
    this.productService.getMaxican().subscribe(data => {
      this.products = data;
    })
  }
  categoryItalian() {
    this.productService.getItalian().subscribe(data => {
      this.products = data;
    })
  }
  categoryJapense() {
    this.productService.getJapnese().subscribe(data => {
      this.products = data;
    })
  }
  categoryIndian() {
    this.productService.getIndian().subscribe(data => {
      this.products = data;
    })
  }
  categoryKorean() {
    this.productService.getKorean().subscribe(data => {
      this.products = data;
    })
  }


}
