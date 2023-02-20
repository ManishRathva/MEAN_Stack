import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  p:any;
  url = 'http://localhost:5000/product';
  constructor(private http:HttpClient) { }

  addProduct(p:product,profileImage:File):Observable<any>{
  let formData = new FormData();
  formData.append('name',p.name);
  formData.append('price',p.price);
  formData.append('brand',p.brand);
  formData.append('image',p.image);
  return this.http.post(this.url,formData);
  }
  getProductlist(){
    return this.http.get(this.url);
  }
  updateProduct(p:product,profileImage:File){
  let formData = new FormData();
  formData.append('name',p.name);
  formData.append('price',p.price);
  formData.append('brand',p.brand);
  formData.append('image',p.image);
  return this.http.put(`${this.url}/${p._id}`,formData);
  }
  deleteProduct(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }
  setter(p:product){
    this.p = p;
    console.log(this.p);

  }
  getter(){
    return this.p;
  }
}
