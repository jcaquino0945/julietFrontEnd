import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminComponent } from '../admin/admin.component';
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { AdminProductDetailComponent } from './admin-product-detail/admin-product-detail.component';

export const routes: Routes = [
    { path: 'adminProduct', component: AdminProductComponent },
    { path: 'adminProduct/:id', component: AdminProductDetailComponent },
  ]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }