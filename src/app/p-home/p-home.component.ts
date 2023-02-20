import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-p-home',
  templateUrl: './p-home.component.html',
  styleUrls: ['./p-home.component.css']
})
export class PHomeComponent implements OnInit{
imagePreview: any;
selecteProduct!:product;
getdata!:product[];
productForm!:FormGroup;
constructor(private fb:FormBuilder , private productService:ProductService,
private router:Router){}
ngOnInit(): void {
this.getProduct();
this.productForm = this.fb.group({
  _id:[''],
  name:['',Validators.required],
  price:['',Validators.required],
  brand:['',Validators.required],
  image:['',Validators.required],
})
}
getProduct(){
  this.productService.getProductlist().subscribe((res:any)=>{
  this.getdata = res as product[];
  console.log(this.getdata);
 })
 }
onProductSubmit(){
console.log(this.productForm.value);
this.productService.addProduct(this.productForm.value,this.productForm.value.image).subscribe(
(res)=>{
console.log("Added Successfully");
this.getProduct();
},
(err)=>{
console.log(err);
});
this.productForm.reset();
}
 deleteData(id:any){
  if(confirm("Are you sure Delete this product")){
    this.productService.deleteProduct(id).subscribe(
      (res)=>{
        console.log("Delete Product Successfully");
        this.getProduct();
       },
       (err)=>{
        console.log(err);
      });
    }
  }
  editData(Data:product){
  this.productService.setter(Data);
  console.log(Data);

  this.router.navigate(['/update']);
  }
  onSelectImage(event: any){
    const file = (event.target).files[0]
    console.log(file.type)
    this.productForm.patchValue({
      image: file,
    });

    const allowedFileType = ['image/png' ,'image/jpg'  ,'image/jpeg'];
if(file && allowedFileType.includes(file.type)){
 const reader = new FileReader()
 reader.onload = () => {
  this.imagePreview = reader.result as string
 }
reader.readAsDataURL(file)
}
  }

}
