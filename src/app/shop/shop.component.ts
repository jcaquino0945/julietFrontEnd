import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from './../services/product.service';
import { Product } from './../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products$: Product[];
  errMess: string;

  constructor(private router : Router,private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products$ => this.products$ = products$,
      errmess => this.errMess = <any>errmess);
  }

}
