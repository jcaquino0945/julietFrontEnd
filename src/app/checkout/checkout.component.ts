import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import Stepper from 'bs-stepper';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { productOrder } from './../models/productOrder';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  items = this.cartService.getItems();
  totalPrice = this.cartService.totalPrice();
  itemPrice = this.cartService.itemPrice();
  cartDetail: any;
  
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  title = 'stepper';
  private stepper: Stepper;

  previous() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }

  ngOnInit(): void {
    console.log(typeof this.itemPrice + "item price")
    console.log(typeof this.totalPrice + "total price")
    console.log(this.items);
    this.nav.show();
    this.ribbon.show();
    this.footer.show();
    this.stepper = new Stepper(document.querySelector('#stepper'), {
      linear: false,
      animation: true,
    });
  }

  onSubmit() {

    //let productArray = [];
    //productArray.push(this.items);
    //console.log("Orders: " + Object.values(this.items));
    //console.log("Total Price is Php " + this.totalPrice);
    //console.log("product array:" + productArray);
    let cartDetail = {
      datePurchased: Date.now(),
      totalPrice: this.totalPrice,
      product: this.items,
    }
    console.log(cartDetail)
    
    this.orderService.addOrder(cartDetail)
  }
}
