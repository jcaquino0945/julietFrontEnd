import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { CartService } from '../services/cart.service';
import { ResponsiveService } from '../services/responsive.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  saveSuccess: boolean;
  saveFailure: boolean;
  public isMobile: Boolean;
  products$: Product[];
  product: Product;
  productIds: string[];
  errMess: string;
  orderForm: FormGroup;
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private cartService: CartService,
    private responsive: ResponsiveService,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.orderForm = this.formBuilder.group({
      selectedOption: [null, Validators.required]
     
      //shippingMethod: [null, Validators.required],
      
    });
    this.productService
      .getFeaturedProducts()
      .subscribe((products) => (this.products$ = products));

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

    this.nav.show();
    this.ribbon.show();
    this.footer.show();

    this.onResize();
    this.responsive.checkWidth();
  }

  addToCart(product) {
    try {
      let cartProduct = {
        _id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        category: product.category,
        size: this.orderForm.get('selectedOption').value,
        quantity: 1,
        orders: product.orders,
        totalPrice: product.price,
        stock_quantity: product.stock_quantity,
        updateStock: product.stock_quantity - 1,
      };
      this.cartService.addToCart(cartProduct);
      console.log(cartProduct);
      this.saveSuccess = true 
      this.router.navigate(['/cart'])
    } catch (error) {
      this.saveFailure = true
    }
    
    
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
 
}
