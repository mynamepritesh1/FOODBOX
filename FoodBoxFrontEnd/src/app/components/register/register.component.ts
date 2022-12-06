import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { Purchase } from 'src/app/models/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LogService } from 'src/app/services/log.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showHeader : number = 0;
  message : string = '';
  formValue: FormGroup
  customer: Customer = new Customer();
  auth: any;
  loginData ={
    email: '',
    password: ''
  }
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
    private formBuilder: FormBuilder,
    private router : Router,
    private cartService: CartService

  ) { }

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
    this.formValue = this.formBuilder.group({
      email: [''],
      password: [''],
      contact: [''],
      name: [''],
      address: ['']
    })
  }
  addCustomer(){
    this.customer.email = this.formValue.value.email;
    this.customer.password = this.formValue.value.password;
    this.customer.name = this.formValue.value.name;
    this.customer.contact = this.formValue.value.contact;
    this.customer.address = this.formValue.value.address;
    
    this.customerService.addCustomer(this.customer).subscribe(data=>{
      this.login = 1
      this.productService.login.next(1);
      localStorage.setItem('cust_email' , this.customer.email);
      localStorage.setItem('cust_name' , this.customer.name);
      localStorage.setItem('cust_address' , this.customer.address);
      localStorage.setItem('cust_contact' , this.customer.contact);

      this.logService.sendId(this.customer.email);
      let ref = document.getElementById('Rcancel');
      ref?.click();
      this.formValue.reset();
      this.goToProducts();
      if(this.login == 1){
         Swal.fire({
          icon: "success",
          title: "register successful"
         })
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Something went wrong"
        })
      }


    },
    error => this.message = 'User already exists , Please Login')
  }
  goToProducts() {
    this.router.navigate([''])
  }
  // submit(){
  //   if(this.loginData.email.trim()=='' || this.loginData.email==null){
  //     this.message = " Please Enter Username"
  //     return ;
  //   }
  //   if(this.loginData.password.trim()=='' || this.loginData.password==null){
  //     this.message = " Please Enter password"
  //     return ;
  //   }
  //   this.customerService.customerLogin(this.loginData).subscribe(data=>{
  //     this.auth = data;
  //     if(this.auth ==true){
  //       this.login = 1;
  //       this.productService.login.next(1);
  //       localStorage.setItem('cust_email',this.loginData.email);
  //       this.logService.sendId('cust_email');
  //       let ref = document.getElementById('Lcancel')
  //       ref?.click();
  //       this.formValue.reset();
  //       this.goToProducts();
  //     }
  //     else{
  //       this.message= " Please enter valid email or password"
  //     }
  //   })
  // }
  
 

  
}

