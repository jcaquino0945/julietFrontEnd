import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  totalPrice = this.cartService.totalPrice();
  itemPrice = this.cartService.itemPrice();
  quantity: number;
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    console.log(this.items);
    this.nav.show();
    this.ribbon.show();
    this.footer.show();
  }
  updatePrice(item,quantity) {
      item.quantity = this.quantity
      item.totalPrice = item.price * item.quantity
      //console.log(item.quantity)
      //console.log(item.price);
      //console.log(item.totalPrice);

      console.log(item);
      this.totalPrice = this.cartService.totalPrice();
      this.itemPrice = this.cartService.itemPrice();
  }
}
