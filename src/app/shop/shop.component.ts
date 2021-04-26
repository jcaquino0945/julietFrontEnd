import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { ProductService } from './../services/product.service';
import { Product } from './../models/product';
import { Router } from '@angular/router';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  public isMobile: Boolean;
  products$: Product[];
  errMess: string;
  loading = true;
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private router: Router,
    private productService: ProductService,
    private responsive: ResponsiveService
  ) {}

  ngOnInit(): void {

    this.nav.show();
    this.ribbon.show();
    this.footer.show();

    this.onResize();
    this.responsive.checkWidth();

    this.productService.getProducts().subscribe(
      (products$) => (this.products$ = products$),
      (errmess) => (this.errMess = <any>errmess)
    );
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

}
