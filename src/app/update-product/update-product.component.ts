import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
constructor(private productSrvice:ProductService , private router:Router ,private fb:FormBuilder){}
editData!:product;
data!:product;
productForm!:FormGroup;
ngOnInit(): void {
this.data = this.productSrvice.getter();
console.log(this.data);
this.productForm = this.fb.group({
  _id:[''],
  name:['',Validators.required],
  price:['',Validators.required],
  brand:['',Validators.required],
  image:[null,Validators.required],
})
}
onSubmit(data:any){
this.productForm = new FormGroup({
  _id:new FormControl(data._id),
  name:new FormControl(data.name),
  price:new FormControl(data.price),
  brand:new FormControl(data.brand),
})
this.productSrvice.updateProduct(data,this.productForm.value).subscribe((res)=>{
this.data = this.productForm.value;
 console.log(res);

})
// this.productSrvice.updateProduct(this.data,data).subscribe(data=>{
//    console.log(data);
//    this.data = this.productForm.value.image,
//    this.data = this.productForm.value.name,
//    this.data = this.productForm.value.price,
//    this.data = this.productForm.value.brand,

this.router.navigate(['/']);
// })
}
}
