import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { ResponsiveService } from '../services/responsive.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isMobile: Boolean;
  products: Product[];
  responsiveOptions;

  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    public product: ProductService,
    private responsive: ResponsiveService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    
    this.nav.show();
    this.ribbon.show();
    this.footer.show();

    this.onResize();
    this.responsive.checkWidth();

    window.scrollTo(0,0);

    this.product
      .getFeaturedProducts()
      .subscribe((products) => (this.products = products));
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
