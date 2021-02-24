import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import Stepper from 'bs-stepper';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  items = this.cartService.getItems();
  totalPrice = this.cartService.totalPrice();
  itemPrice = this.cartService.itemPrice();
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private cartService: CartService
  ) {}

  title = 'stepper';
  private stepper: Stepper;

  previous() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit(): void {
    this.nav.show();
    this.ribbon.show();
    this.footer.show();
    
    this.stepper = new Stepper(document.querySelector('#stepper'), {
      linear: false,
      animation: true,
    });
  }
}
