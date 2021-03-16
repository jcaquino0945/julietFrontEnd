import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminComponent } from '../admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminProductDetailComponent } from './admin-product-detail/admin-product-detail.component';
import { AdminStockComponent } from './admin-stock/admin-stock.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
  { path: 'admin', redirectTo: '/admin/dashboard', component: AdminProductComponent },
  { path: 'adminProduct', component: AdminProductComponent },
  { path: 'adminProduct/:id', component: AdminProductDetailComponent },
  { path: 'adminStock', component: AdminStockComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reports', component: ReportsComponent },

  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }, // redirect to `Home`
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
