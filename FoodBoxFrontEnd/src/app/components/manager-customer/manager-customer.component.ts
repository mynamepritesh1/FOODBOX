import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Purchase } from 'src/app/models/purchase';
import { CustomerService } from 'src/app/services/customer.service';
import { LogService } from 'src/app/services/log.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-customer',
  templateUrl: './manager-customer.component.html',
  styleUrls: ['./manager-customer.component.css']
})
export class ManagerCustomerComponent implements OnInit {
    searchKey:string;
    public allCustomers:Customer[];
    public activeOrders: Purchase[]=[];
    login : number = 0;


  constructor(
    private purchaseService: PurchaseService,
    private customerService: CustomerService,
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
    this.getCustomers();
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(data =>{
      this.allCustomers = data;
    })
  }
  adminLogout(){
    this.logService.sendId('');
    this.router.navigate(['/admin']);
  }
  searchCustomer(){
    if(this.searchKey== ''){
      this.getCustomers();
    }else{
      this.customerService.searchCustomer(this.searchKey).subscribe(data=>{
        this.allCustomers = data;
      })
    }
  }
  getActiveOrders(email:string){
    this.purchaseService.getCustomerOrders(email).subscribe(data =>{
      this.activeOrders = data
    })
  }
  deleteCustomer(email:string){
    this.customerService.deleteCustomer(email).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'User Deleted Succesfully'
      })
      this.getCustomers();
    },
    error=>{
      Swal.fire({
        icon:error,
        title: "Oops",
        text: 'User cant be deleted until orders are not deleted'
      })
    })
  }

}
