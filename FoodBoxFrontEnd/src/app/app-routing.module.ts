import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagePurchaseComponent } from './components/manage-purchase/manage-purchase.component';
import { ManagerCustomerComponent } from './components/manager-customer/manager-customer.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '' , redirectTo: 'home' , pathMatch: 'full'},
  {path: 'home' , component: HomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'cart' , component: CartComponent},
  {path: 'admin' , component: AdminLoginComponent},
  {path: 'adminDashboard' , component: AdminDashboardComponent},
  {path: 'payment' , component:PaymentComponent},
  {path: 'orderSummary' , component:OrderComponent},
  {path: 'managePurchase', component: ManagePurchaseComponent},
  {path: 'manageCustomer', component: ManagerCustomerComponent}


  




  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
