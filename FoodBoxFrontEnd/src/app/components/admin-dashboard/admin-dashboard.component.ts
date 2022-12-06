import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { LogService } from 'src/app/services/log.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public allProducts: Product[];
  public sortedProduct: Product[];
  formValue!: FormGroup;
  productModel:Product=new Product();
  showAdd !: boolean;
  showUpdate !: boolean;
  message: string = '';


  constructor(
    private logService: LogService,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { 
    this.allProducts= [];
    this.sortedProduct= this.allProducts.slice();

  }

  ngOnInit(): void {
    this.getProducts();
    this.logService.sendHeader(0);
    this.logService.loggedAdminId$.subscribe((id)=>{
      console.log('id '+id);
      if(id==''){
        this.router.navigate(['/admin']);
      }
    })
    this.formValue = this.formBuilder.group({
      name:[''],
      type : [''],
      category: [''],
      actualPrice: [''],
      discount : [''],
      price: [''],
      avail : [''],
      imagepath:[''],
      persons: [''],
      calories: [''],
      stars: [''], 

      
    })
  }
  getProducts() {
    this.productService.getFullProductList().subscribe(data=>{
      this.allProducts=data;
      this.sortedProduct=this.allProducts;
    })
  }
  sortData(sort: Sort){
    const data = this.allProducts.slice();
    if(!sort.active || sort.direction === ''){
      this.sortedProduct = data;
      return;
    }
    this.sortedProduct = data.sort((a,b) => {
      const isAsc = sort.direction == 'asc';
      switch(sort.active){
        case 'name': return this.compare(a.name,b.name,isAsc);
        case 'type': return this.compare(a.type,b.type,isAsc);
        case 'category': return this.compare(a.category,b.category,isAsc);
        case 'actualPrice': return this.compare(a.actualPrice,b.actualPrice,isAsc);
        case 'price': return this.compare(a.price,b.price,isAsc);
        case 'avail': return this.compare(a.avail,b.avail,isAsc);
        case 'persons': return this.compare(a.persons,b.persons,isAsc);
        case 'calories': return this.compare(a.calories,b.calories,isAsc);
        case 'stars': return this.compare(a.stars,b.stars,isAsc);
        case 'discount': return this.compare(a.discount,b.discount,isAsc);
        default: return 0;
      }
    })
  }
  compare(a:number| string,b:number|string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  clickAddProduct(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  clickEditProduct(){
    this.formValue.reset();
    this.showAdd=false;
    this.showUpdate=true;
  }

  addProduct(){
    if(this.formValue.value.name == null || this.formValue.value.type == null 
      || this.formValue.value.category == null || this.formValue.value.actualPrice == null
      || this.formValue.value.avail == null || this.formValue.value.persons == null 
      || this.formValue.value.calories == null || this.formValue.value.imagepath == null 
      || this.formValue.value.stars == null || this.formValue.value.discount == null){
        this.message = " fields must not be empty";
        return;
      }
      this.productModel.name = this.formValue.value.name;
      this.productModel.type = this.formValue.value.type;
      this.productModel.category = this.formValue.value.category;
      this.productModel.avail = this.formValue.value.avail;
      this.productModel.actualPrice = this.formValue.value.actualPrice;
      this.productModel.calories = this.formValue.value.calories;
      this.productModel.persons = this.formValue.value.persons;
      this.productModel.stars = this.formValue.value.stars;
      this.productModel.discount = this.formValue.value.discount;
      this.productModel.imagepath = this.formValue.value.imagepath;
      this.productService.addProduct(this.productModel).subscribe(res=>{
        Swal.fire({
          icon: 'success',
          title: 'food added sucessfully'
        })
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getProducts();
      },
      err =>{
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
      })
  }
  onEdit(prod:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.productModel.id - prod.id;
    this.formValue.controls['name'].setValue(prod.name);
    this.formValue.controls['caterory'].setValue(prod.caterory);
    this.formValue.controls['type'].setValue(prod.type);
    this.formValue.controls['imagepath'].setValue(prod.imagepath);
    this.formValue.controls['actualPrice'].setValue(prod.actualPrice);
    this.formValue.controls['price'].setValue(prod.price);
    this.formValue.controls['discount'].setValue(prod.discount);
    this.formValue.controls['persons'].setValue(prod.persons);
    this.formValue.controls['avail'].setValue(prod.avail);
    this.formValue.controls['stars'].setValue(prod.stars);
    this.formValue.controls['calories'].setValue(prod.calories);
  }

  updateProduct(){
    if(this.formValue.value.name == null || this.formValue.value.type == null 
      || this.formValue.value.category == null || this.formValue.value.actualPrice == null
      || this.formValue.value.avail == null || this.formValue.value.persons == null 
      || this.formValue.value.calories == null || this.formValue.value.imagePath == null 
      || this.formValue.value.stars == null || this.formValue.value.discount == null){
        this.message = " fields must not be empty";
        return;
      }
      this.productModel.name = this.formValue.value.name;
      this.productModel.type = this.formValue.value.type;
      this.productModel.category = this.formValue.value.category;
      this.productModel.avail = this.formValue.value.avail;
      this.productModel.actualPrice = this.formValue.value.actualPrice;
      this.productModel.calories = this.formValue.value.calories;
      this.productModel.persons = this.formValue.value.persons;
      this.productModel.stars = this.formValue.value.stars;
      this.productModel.discount = this.formValue.value.discount;
      this.productModel.imagepath = this.formValue.value.imagePath;
      this.productService.updateProduct(this.productModel.id,this.productModel).subscribe(res=>{
        Swal.fire({
          icon: 'success',
          title: 'food updated sucessfully'
        })

        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getProducts();
      },
      error=>{
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
      })

  }
  deleteProduct(prod : any){
    this.productService.deleteProduct(prod.id).subscribe(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Product delete succesfully'
      })
      this.getProducts();
    })
  }
  adminLogout(){
    this.logService.sendId('');
    this.router.navigate(['/admin']);
  }


}
