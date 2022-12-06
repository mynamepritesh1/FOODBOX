import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalCost:any;
  cust_email:string;
  transId:string;
  buyProdMap={
    email:'',
    transactionId:''
  }
  login : number = 0;


  constructor(
    private logService: LogService,
    private router : Router,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    this.logService.loggeduserId.subscribe((id)=>{
      if(this.login = 0){
        this.router.navigate(['']);
      }
    });
    this.totalCost=39+Number(localStorage.getItem('grandTotal'));

    this.cust_email = localStorage.getItem('cust_email');
    this.generatedTransaId();
    this.buyProdMap.email=this.cust_email;
    this.buyProdMap.transactionId=this.transId;
  }
  buyProducts(){
    this.purchaseService.buyProducts(this.buyProdMap).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: "Your food is sucessfully orderd"
      })
    })
    this.router.navigate(['/orderSummary'])
  }
  generatedTransaId() {
    var num1 = Math.floor(Math.random() * 999999 - 100000) + 100000;
    var num2 = Math.floor(Math.random() * 999999 - 100000) + 100000;
    this.transId = "PRPI" + (num1.toString())+(num2.toString());
    localStorage.setItem("transId",this.transId);

  }

}
