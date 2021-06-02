import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product';
import { Orders } from '../../models/orders';
import * as _ from 'lodash';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css'],
})
export class AdminProductDetailComponent implements OnInit {
  saveSuccess: boolean;
  saveFailure: boolean;
  products$: Product[];
  product: Product;
  productIds: string[];
  orders$: Orders[];
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
  sizes = [];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  orderTimes: any;
  public isMobile: Boolean;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private responsive: ResponsiveService,
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('token')
    this.productService
      .getProductIds()
      .subscribe((productIds) => (this.productIds = productIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productService.getProduct(params['id']);
        })
      )
      .subscribe(
        (product) => {
          this.product = product;
          this.galleryForm.get('name').setValue(this.product.name);
          this.galleryForm
            .get('description')
            .setValue(this.product.description);
          this.galleryForm.get('price').setValue(this.product.price);
          this.galleryForm.get('category').setValue(this.product.category);
          this.galleryForm
            .get('stock_quantity')
            .setValue(this.product.stock_quantity);
          this.galleryForm.get('featured').setValue(this.product.featured);
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);

    this.galleryForm = this.formBuilder.group({
      //imageFile : [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      category: [null, Validators.required],
      stock_quantity: 0,
      featured: false,
    });

    this.onResize();
    this.responsive.checkWidth();
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  addSize(s) {
    if (this.sizes.includes(s) === false) this.sizes.push(s);    
  }

  goBack(): void {
    this.location.back();
  }

  deleteProduct(id) {
    if (window.confirm('Are you sure?')) {
      this.productService.deleteProduct(id).subscribe(
        (products$) => (this.products$ = products$),
        (errmess) => (this.errMess = <any>errmess)
      );
      console.log('deleted product with id: ' + id);
      this.router.navigate(['/admin/adminProduct']);
    }
    //resubscribe to refresh
    this.productService
      .getProductIds()
      .subscribe((productIds) => (this.productIds = productIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productService.getProduct(params['id']);
        })
      )
      .subscribe(
        (product) => {
          this.product = product;
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);
  }

  onFormSubmit(id) {
    this.productService.updateProduct(id, this.galleryForm.value).subscribe(
      (res) => {
        console.log('Content updated');
        document.getElementById('close').click(); // close modal
        this.saveSuccess = true;

      },
      (error) => {
        console.log(error);
        this.saveFailure = true
      }
    );
    //resubscribe to refresh
    this.productService
      .getProductIds()
      .subscribe((productIds) => (this.productIds = productIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productService.getProduct(params['id']);
        })
      )
      .subscribe(
        (product) => {
          this.product = product;
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);
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
