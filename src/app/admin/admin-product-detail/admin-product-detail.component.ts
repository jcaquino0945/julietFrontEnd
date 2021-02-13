import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import {ProductService} from '../../services/product.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit {
  product: Product;
  productIds: string[];
  prev: string;
  next: string;
  errMess: string;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productService.getProductIds().subscribe(productIds => this.productIds = productIds);
    this.route.params.pipe(switchMap((params: Params) => { return this.productService.getProduct(params['id']); }))
    .subscribe(product => {
      this.product = product;
       },
          err => console.log(err));
       errmess => this.errMess = <any>errmess;
  }
  goBack(): void {
    this.location.back();
  }
 

}
