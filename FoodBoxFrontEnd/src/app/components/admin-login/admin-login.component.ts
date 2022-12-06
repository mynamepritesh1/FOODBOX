import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { LogService } from 'src/app/services/log.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  formValue: FormGroup;
  adminData : any;
  loginData ={
    username: '',
    password: ''
  }
  auth: any;

  constructor(
    private logService: LogService,
    private adminService: AdminService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.logService.sendHeader(0);
  }

  loginSubmit(){
    this.adminService.adminLogin(this.loginData).subscribe(data =>{
      this.auth = data;
      if(this.auth =true){
        this.logService.sendAdmin(this.loginData.username);
        Swal.fire({
          icon: 'success',
          title: 'login successful',
          text: 'Welcome to login dashboard' 
        })
        this.router.navigate(['/adminDashboard']);
      }else{
        Swal.fire({
          icon: 'error',
          title: "please enter valid username or passowrd"
        })
      
      }
    })
  }

}
