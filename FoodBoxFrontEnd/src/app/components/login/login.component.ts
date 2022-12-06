import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = '';
  formValue: FormGroup
  submitted = false;
  isLoginError: boolean = false;
  auth: any;
  loginData = {
    email: '',
    password: ''
  }
  login: number = 0;
  

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  submit() {
    
    this.submitted = true;
    if (this.formValue.invalid) {
      return;
    }
    this.customerService.customerLogin(this.loginData).subscribe((data: any) => {
      this.login = 1;
      this.productService.login.next(1);
      localStorage.setItem('login', data.loginStatus);
      localStorage.setItem('cust_email', data.email);
      if (data.loginStatus = true) {
        Swal.fire({
          icon: "success",
          title: "login successful"
        })
        this.router.navigate([''])

      }
      else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong"
        })
        this.router.navigate(['/login'])

      }

    }
    )
     const loginStorage = new Login();
     
  }
}
