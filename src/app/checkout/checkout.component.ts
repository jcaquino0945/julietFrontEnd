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
  postalCode='';

  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private cartService: CartService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
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
    }
    console.log(cartDetail)
    
    this.orderService.addOrder(cartDetail)
  }
}
