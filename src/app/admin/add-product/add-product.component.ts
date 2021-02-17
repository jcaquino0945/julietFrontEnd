import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  galleryForm: FormGroup;
  products$: Product[];
  errMess: string;
  imageFile: File = null;
  name = '';
  description = '';
  price = 0;
  category = '';
  stock_quantity = 0;
  featured = false;
  size = [];
  //orders
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  constructor(private router : Router,private productService:ProductService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.galleryForm = this.formBuilder.group({
      imageFile : [null, Validators.required],
      name : [null, Validators.required],
      description : [null, Validators.required],
      price : [null, Validators.required],
      category : [null, Validators.required],
      size: [],
      stock_quantity : 0,
      featured: false
    });
  }
  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.productService.addGallery(this.galleryForm.value, this.galleryForm.get('imageFile').value._files[0])
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        if (res.body) {
          this.router.navigate(['/admin/adminProduct/', res.body._id]); //navigate to product detail page
          this.productService.getProducts().subscribe(products$ => this.products$ = products$,
            errmess => this.errMess = <any>errmess);
        }
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
      this.galleryForm.reset();
  }

}
