import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminRoutingModule } from './admin-routing';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminProductDetailComponent } from './admin-product-detail/admin-product-detail.component';
import { AdminStockComponent } from './admin-stock/admin-stock.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminProductSearchComponent } from './admin-product-search/admin-product-search.component';
@NgModule({
  declarations: [
    AdminProductComponent,
    AdminProductDetailComponent,
    AdminStockComponent,
    OrdersComponent,
    DashboardComponent,
    ReportsComponent,
    OrderDetailsComponent,
    AdminProductSearchComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [
    AdminProductComponent,
  ]
})
export class AdminModule { }
