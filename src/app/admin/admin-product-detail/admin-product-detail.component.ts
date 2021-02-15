import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import {ProductService} from '../../services/product.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit {
  products$: Product[];
  product: Product;
  productIds: string[];
  prev: string;
  next: string;
  errMess: string;
  galleryForm: FormGroup;
  imageFile: File = null;
  name = '';
  description = '';
  price = 0;
  category = '';
  stock_quantity = 0;
  featured = false;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,private router : Router) { }

  ngOnInit(): void {
    this.productService.getProductIds().subscribe(productIds => this.productIds = productIds);
    this.route.params.pipe(switchMap((params: Params) => { return this.productService.getProduct(params['id']); }))
    .subscribe(product => {
      this.product = product;
       },
          err => console.log(err));
       errmess => this.errMess = <any>errmess;
/*
       this.galleryForm = this.formBuilder.group({
        imageFile : [null, Validators.required],
        name : [null, Validators.required],
        description : [null, Validators.required],
        price : [null, Validators.required],
        category : [null, Validators.required],
        stock_quantity : 0,
        featured: false
  
      });
      */
  }
  goBack(): void {
    this.location.back();
  }
  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(products$ => this.products$ = products$,
      errmess => this.errMess = <any>errmess)
    console.log("deleted product with id: " + id);
     this.router.navigate(['/admin/adminProduct'])
  }
/*
  onFormSubmit(id): void {
    this.isLoadingResults = true;
    this.productService.updateProduct(id,this.galleryForm.value, this.galleryForm.get('imageFile').value._files[0])
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        if (res.body) {
          document.getElementById('close').click();// close modal
          this.router.navigate(['/admin/adminProduct/', res.body._id]); //navigate to product detail page
          
          //code for resubscribing 
          this.productService.getProductIds().subscribe(productIds => this.productIds = productIds);
          this.route.params.pipe(switchMap((params: Params) => { return this.productService.getProduct(params['id']); }))
          .subscribe(product => {
            this.product = product;
            },
                err => console.log(err));
            errmess => this.errMess = <any>errmess;

        }
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
      this.galleryForm.reset();
  }
*/
}
