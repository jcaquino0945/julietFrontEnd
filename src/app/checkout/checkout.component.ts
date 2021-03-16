import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import Stepper from 'bs-stepper';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ResponsiveService } from '../services/responsive.service';

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
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public isMobile: Boolean;
  items = this.cartService.getItems();
  totalPrice = this.cartService.totalPrice();
  itemPrice = this.cartService.itemPrice();
  cartDetail: any;
  orderForm: FormGroup;
  firstName = '';
  lastName = '';
  contactNumber = '';
  email = '';
  street = '';
  province = '';
  city = '';
  region = '';
  postalCode = '';

  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private cartService: CartService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private responsive: ResponsiveService
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
    this.orderForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      contactNumber: [null, Validators.required],
      email: [null, Validators.required],
      street: [null, Validators.required],
      province: [null, Validators.required],
      city: [null, Validators.required],
      region: [null, Validators.required],
      postalCode: [null, Validators.required],
    });

    this.nav.show();
    this.ribbon.show();
    this.footer.show();
    this.stepper = new Stepper(document.querySelector('#stepper'), {
      linear: false,
      animation: true,
    });
    
    this.onResize();
    this.responsive.checkWidth();
  }

  onSubmit() {
    //let productArray = [];
    //productArray.push(this.items);
    //console.log("Orders: " + Object.values(this.items));
    //console.log("Total Price is Php " + this.totalPrice);
    //console.log("product array:" + productArray);
    let cartDetail = {
      firstName: this.orderForm.get('firstName').value,
      lastName: this.orderForm.get('lastName').value,
      contactNumber: this.orderForm.get('contactNumber').value,
      email: this.orderForm.get('email').value,
      street: this.orderForm.get('street').value,
      province: this.orderForm.get('province').value,
      city: this.orderForm.get('city').value,
      region: this.orderForm.get('region').value,
      postalCode: this.orderForm.get('postalCode').value,
      datePurchased: Date.now(),
      totalPrice: this.totalPrice,
      product: this.items,
    };

    let emailDetail = {
      to: this.orderForm.get('email').value,
      subject: `Order for ${this.orderForm.get('firstName').value}`,
      html: `<h2>Thank you for your order${
        this.orderForm.get('firstName').value
      }!</h2>
      <p>Your total purchase is worth Php ${this.totalPrice} </p>
      <p>We will reply back to you when we have already processed your order!</p>
      `,
    };
    console.log(cartDetail);

    this.orderService.addOrder(cartDetail);
    this.orderService.sendReceipt(emailDetail);
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
