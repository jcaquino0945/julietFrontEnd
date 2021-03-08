import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import {ProductService} from './../services/product.service';
import { Product } from './../models/product';
import { Router } from '@angular/router';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.component.html',
  styleUrls: ['./shop-by-category.component.css']
})
export class ShopByCategoryComponent implements OnInit {
  products$: Product[];
  errMess: string;
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private router : Router,
    private productService:ProductService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.nav.show();
    this.ribbon.show();
    this.footer.show();

    this.route.params.pipe(switchMap((params: Params) => { return this.productService.getProductsByCategory(params['category']); }))
    .subscribe(products$ => {
      this.products$ = products$;
    },
    err => console.log(err));
    errmess => this.errMess = <any>errmess;

  }

}
