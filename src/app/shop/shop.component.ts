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
  products: Product[];
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
    window.scrollTo(0,0);
    this.responsive.checkWidth();

    this.productService.getProducts().subscribe(
      (products) => (this.products = products),
      (errmess) => (this.errMess = <any>errmess)
    );
    
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  // sorts the product by the highest price and vice versa / sorts alphabetically
  sortProductByPrice(option) {
    if (option.value == "l2h") {
      this.products.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (option.value == "h2l") {
      this.products.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (option.value == "a2z") {
      this.products.sort(function (a, b) {     
        return ('' + a.name).localeCompare(b.name); 
      })
    } else if (option.value == "z2a"){
      this.products.sort(function (a, b) {     
        return ('' + b.name).localeCompare(a.name); 
      })
    }
  };

}
