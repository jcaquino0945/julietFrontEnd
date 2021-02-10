import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminComponent } from '../admin/admin.component';
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: AdminComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'adminProduct', component: AdminProductComponent },
  ]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }