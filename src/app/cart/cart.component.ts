import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { CartService } from '../services/cart.service';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public isMobile: Boolean;
  items = this.cartService.getItems();
  totalPrice = this.cartService.totalPrice();
  itemPrice = this.cartService.itemPrice();
  quantity: number;
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private cartService: CartService,
    private responsive: ResponsiveService
  ) {}

  ngOnInit(): void {
    console.log(this.items);
    this.nav.show();
    this.ribbon.show();
    this.footer.show();
    this.onResize();
    this.responsive.checkWidth();
  }
  addQuantity(item) {
    item.quantity++;
    if (item.quantity == 11) {
      item.quantity = 10;
    }
    item.totalPrice = item.price * item.quantity;

    this.totalPrice = this.cartService.totalPrice();
    this.itemPrice = this.cartService.itemPrice();

  }
  subtractQuantity(item) {
    item.quantity--;
    if (item.quantity == 0) {
      item.quantity = 1;
    }
    item.totalPrice = item.price * item.quantity;
    
    this.totalPrice = this.cartService.totalPrice();
    this.itemPrice = this.cartService.itemPrice();

  }
  updatePrice(item) {
    //item.quantity = this.quantity;
    item.totalPrice = item.price * this.quantity;
    
    //console.log(item.quantity)
    //console.log(item.price);
    //console.log(item.totalPrice);

    console.log(item);
    this.totalPrice = this.cartService.totalPrice();
    this.itemPrice = this.cartService.itemPrice();
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
