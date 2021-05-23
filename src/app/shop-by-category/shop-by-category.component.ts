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
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.component.html',
  styleUrls: ['./shop-by-category.component.css']
})
export class ShopByCategoryComponent implements OnInit {
  public isMobile: Boolean;

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
    private responsive: ResponsiveService

  ) { }

  ngOnInit(): void {
    this.nav.show();
    this.ribbon.show();
    this.footer.show();

    this.onResize();
    this.responsive.checkWidth();

    this.route.params.pipe(switchMap((params: Params) => { return this.productService.getProductsByCategory(params['category']); }))
    .subscribe(products$ => {
      this.products$ = products$;
    },
    err => console.log(err));
    errmess => this.errMess = <any>errmess;

  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
  sortProductByPrice(option) {
    if (option.value == "l2h") {
      this.products$.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (option.value == "h2l") {
      this.products$.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (option.value == "a2z") {
      this.products$.sort(function (a, b) {
        return ('' + a.name).localeCompare(b.name); 
      })
    } else if (option.value == "z2a"){
      this.products$.sort(function (a, b) {
        return ('' + b.name).localeCompare(a.name); 
      })
    }
  };

}
