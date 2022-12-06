import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Purchase } from 'src/app/models/purchase';
import { CustomerService } from 'src/app/services/customer.service';
import { LogService } from 'src/app/services/log.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-purchase',
  templateUrl: './manage-purchase.component.html',
  styleUrls: ['./manage-purchase.component.css']
})
export class ManagePurchaseComponent implements OnInit {
  public allPurchase:Purchase[];
  public allCustomers:Customer[];
  keyword: any;
  login : number = 0;



  constructor(private purchaseService: PurchaseService,
              private logService: LogService,
              private customerService: CustomerService,
              private router : Router) { }

  ngOnInit(): void {
    this.logService.sendHeader(1);
    this.logService.loggeduserId.subscribe(
      (id) =>{
        if(this.login = 0){
          this.router.navigate(['']);
        }
      }
    );
    this.getAllPurchase();
  }
  getAllPurchase() {
    this.purchaseService.getAllPurchase().subscribe(data =>{
      this.allPurchase = data;
    })
  }
  deletePurchase(id:any){
    this.purchaseService.deletePurchase(id).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Order Succesfully Deleted'
      })
        this.getAllPurchase();
    })
  }

  searchPurchase(){
    if(this.keyword == ''){
      this.getAllPurchase();
    }else{
      this.purchaseService.searchPurchase(this.keyword).subscribe(data=>{
        this.allPurchase = data;
      })
    }
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


}
