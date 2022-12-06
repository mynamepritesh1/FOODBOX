import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { IvyCarouselModule } from 'angular-responsive-carousel';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerCustomerComponent } from './components/manager-customer/manager-customer.component';
import { ManagePurchaseComponent } from './components/manage-purchase/manage-purchase.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { EcartComponent } from './components/ecart/ecart.component';
import { CartComponent } from './components/cart/cart.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    CartComponent,
    HomeComponent,
    ManagerCustomerComponent,
    ManagePurchaseComponent,
    OrderComponent,
    PaymentComponent,
    ProductComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CarouselComponent,
    EcartComponent,
    NavComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IvyCarouselModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
