import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from '../../models/product';
import { size } from '../../models/sizes';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
//import { AuthService } from '../../auth.service';

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
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  products$: Product[];
  errMess: string;
  galleryForm: FormGroup;
  searchForm: FormGroup;
  imageFile: File = null;
  @ViewChild('labelImport')
  labelImport: ElementRef;
  name = '';
  description = '';
  price = 0;
  category = '';
  stock_quantity = 0;
  featured = false;
  sizes = [];

  // orders
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products$) => (this.products$ = products$),
      (errmess) => (this.errMess = <any>errmess)
    );
    this.searchForm = this.formBuilder.group({
      searchName: [null, Validators.required],
    })

    this.galleryForm = this.formBuilder.group({
      imageFile: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      category: [null, Validators.required],
      sizes: [null, Validators.required],
      stock_quantity: 0,
      featured: false,
    });
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map((f) => f.name)
      .join(', ');
    this.imageFile = files.item(0);
  }

  addSize(s) {
    this.sizes.push(s);
  }

  search() {
    this.productService.setSearchQuery(this.searchForm.get('searchName').value)
    console.log(this.productService.getSearchQuery())
    this.router.navigate(['admin/adminProduct/search'])
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.productService
      .addGallery(this.galleryForm.value, this.imageFile, this.sizes)
      .subscribe(
        (res: any) => {
          this.isLoadingResults = false;
          if (res.body) {
            document.getElementById('close').click(); // close modal
            this.router.navigate(['/admin/adminProduct/', res.body._id]); // navigate to product detail page
            this.productService.getProducts().subscribe(
              (products$) => (this.products$ = products$),
              (errmess) => (this.errMess = <any>errmess)
            );
          }
        },
        (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
    this.galleryForm.reset();
  }
  /*
  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(
      (products$) => (this.products$ = products$),
      (errmess) => (this.errMess = <any>errmess)
    );

    this.productService.getProducts().subscribe(
      (products$) => (this.products$ = products$),
      (errmess) => (this.errMess = <any>errmess)
    );
  }
*/
}
