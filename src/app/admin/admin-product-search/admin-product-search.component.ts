import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { size } from '../../models/sizes';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
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
  selector: 'app-admin-product-search',
  templateUrl: './admin-product-search.component.html',
  styleUrls: ['./admin-product-search.component.css']
})
export class AdminProductSearchComponent implements OnInit {
  products$: Product[];
  errMess: string;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let searchQuery = this.productService.getSearchQuery();
    console.log(searchQuery);
    this.productService.searchProduct(searchQuery).subscribe(
      (products$) => (this.products$ = products$, console.log(this.products$)),
     
      (errmess) => (this.errMess = <any>errmess)
    );

    this.searchForm = this.formBuilder.group({
      searchName: [null, Validators.required],
    })
  }
  search() {
    this.productService.setSearchQuery(this.searchForm.get('searchName').value)
    console.log(this.productService.getSearchQuery())
    
    let searchQuery = this.productService.getSearchQuery();
    console.log(searchQuery);
    this.productService.searchProduct(searchQuery).subscribe(
      (products$) => (this.products$ = products$, console.log(this.products$)),
     
      (errmess) => (this.errMess = <any>errmess)
    );
  }

}
