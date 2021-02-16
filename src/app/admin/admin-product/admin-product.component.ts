import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '../../services/product.service';

import { Product } from '../../models/product';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
//import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products$: Product[];
  errMess: string;
 
  constructor(private router : Router,private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products$ => this.products$ = products$,
      errmess => this.errMess = <any>errmess);
    
    
  }
  /*
  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(products$ => this.products$ = products$,
      errmess => this.errMess = <any>errmess)
    
      this.productService.getProducts().subscribe(products$ => this.products$ = products$,
        errmess => this.errMess = <any>errmess);
  }

  openDialog() {
    this.dialog.open(AddProductDialog);

  }
*/


}


