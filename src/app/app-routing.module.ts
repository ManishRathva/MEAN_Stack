import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PHomeComponent } from './p-home/p-home.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
{path:'',component:PHomeComponent},
{path:'update',component:UpdateProductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
