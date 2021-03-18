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
import { Router } from '@angular/router';

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
  postalCode='';
  shippingMethod='';
  value: number;
  paymentMethod = '';
  status='';
  orderId='';

  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private cartService: CartService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private responsive: ResponsiveService,
    private router: Router

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
    this.orderId = this.makeid(15);
    if (this.items.length == 0) {
      this.router.navigate(['home'])
    }  
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
      //shippingMethod: [null, Validators.required],
    });

    this.nav.show();
    this.ribbon.show();
    this.footer.show();
    this.stepper = new Stepper(document.querySelector('#stepper'), {
      linear: false,
      animation: true,
    });
    this.value = 90;
    this.totalPrice = this.itemPrice + this.value;
    this.shippingMethod = "LBC (Metro Manila)";
    this.paymentMethod = 'Bank Transfer (BDO,BPI,etc)';
    this.status = 'Awaiting Payment'
  }
  

  onSubmit() {
    let dateNow = new Date();
    /*
    if (this.orderForm.invalid) {
      document.getElementsByClassName('')
    }*/
    try {
      let cartDetail = {
        orderId: this.orderId,
        firstName: this.orderForm.get('firstName').value,
        lastName: this.orderForm.get('lastName').value,
        contactNumber: this.orderForm.get('contactNumber').value,
        email: this.orderForm.get('email').value,
        street: this.orderForm.get('street').value,
        province: this.orderForm.get('province').value,
        city: this.orderForm.get('city').value,
        region: this.orderForm.get('region').value,
        postalCode: this.orderForm.get('postalCode').value,
        datePurchased: dateNow,
        totalPrice: this.totalPrice,
        product: this.items,
        shippingMethod: this.shippingMethod,
        paymentMethod: this.paymentMethod,
        status: this.status
      }
      if (this.paymentMethod == 'Bank Transfer (BDO,BPI,etc)') {
        let emailDetail = {
          to: this.orderForm.get('email').value,
          subject: `Order for ${this.orderForm.get('firstName').value}`,  
          /*
          html: `<h2>Thank you for your order${this.orderForm.get('firstName').value}!</h2>
          <p>Your total purchase is worth Php ${this.totalPrice} </p>
          <p>We will reply back to you when we have already processed your order!</p>
          `,*/
          html: `
          <div style="border: black 1px solid; padding:2vw; margin:1.5vw; width:80%; height:auto;">
          <h1 style="text-align: center;">Order Confirmation</h1>
          <br>
          <h2 style="color:#6e815d text-align: center;">Hello ${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value}!</h2>
          <p style="color:black">We have received your order <span style="font-weight:bold">#${this.orderId}</span> on date <span style="font-weight:bold">#${dateNow.toString()}</span> and you will be paying for this via <span style="font-weight:bold">#${this.paymentMethod}</span>.</p>
          <br>
          <p>Order Status: <span style="color:orange">${this.status}</p>
          <p>Total Amount: <span style="color:black">${this.totalPrice}</span></p>
          <hr style="color:#6e815d">
          <br>
          <h1 style="text-align: center;">Payment Instructions (${this.paymentMethod})</h1>
          <p>1.) Please send your payment via bank transfer using the following details</p>
          <p>a. Bank: <span style="font-weight: bold; text-decoration: underline;">BPI Family Savings Bank</span></p>
          <p>b. Account Name: <span style="font-weight: bold; text-decoration: underline;">Antonith Joy P. Telesforo</span></p>
          <p>c. Account Number: <span style="font-weight: bold; text-decoration: underline;">0429744199</span></p>
          <br>
          <p>If you have any questions, feel free to reply to this email.</p>
          </div> 
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        window.alert("Succesful order!");
      }
      if (this.paymentMethod == 'G-Cash') {
        let emailDetail = {
          to: this.orderForm.get('email').value,
          subject: `Order for ${this.orderForm.get('firstName').value}`,  
          /*
          html: `<h2>Thank you for your order${this.orderForm.get('firstName').value}!</h2>
          <p>Your total purchase is worth Php ${this.totalPrice} </p>
          <p>We will reply back to you when we have already processed your order!</p>
          `,*/
          html: `
          <div style="border: black 1px solid; padding:2vw; margin:1.5vw; width:80%; height:auto;">
          <h1 style="text-align: center;">Order Confirmation</h1>
          <br>
          <h2 style="color:#6e815d text-align: center;">Hello ${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value}!</h2>
          <p style="color:black">We have received your order <span style="font-weight:bold">#${this.orderId}</span> on date <span style="font-weight:bold">#${dateNow.toString()}</span> and you will be paying for this via <span style="font-weight:bold">#${this.paymentMethod}</span>.</p>
          <br>
          <p>Order Status: <span style="color:orange">${this.status}</p>
          <p>Total Amount: <span style="color:black">${this.totalPrice}</span></p>
          <hr style="color:#6e815d">
          <br>
          <h1 style="text-align: center;">Payment Instructions (${this.paymentMethod})</h1>
          <p>1.) Please send your payment via bank transfer using the following details</p>
          <p>a. G-Cash Number: <span style="font-weight: bold; text-decoration: underline;">09326584281</span></p>
          <p>b. Message: <span style="font-weight: bold; text-decoration: underline;">(Input your order number)</span></p>
          <br>
          <p>If you have any questions, feel free to reply to this email.</p>
          </div> 
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        window.alert("Succesful order!");
      }
      if (this.shippingMethod == 'Same Day Delivery (COD)') {
        let emailDetail = {
          to: this.orderForm.get('email').value,
          subject: `Order for ${this.orderForm.get('firstName').value}`,  
          /*
          html: `<h2>Thank you for your order${this.orderForm.get('firstName').value}!</h2>
          <p>Your total purchase is worth Php ${this.totalPrice} </p>
          <p>We will reply back to you when we have already processed your order!</p>
          `,*/
          html: `
          <h2 style="color:#6e815d">Order Confirmation</h2>
          <br>
          <h4>Hello <span style="color:#6e815d">${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value}!</span></h4>
          <br>
          <p>Thank you for ordering with Juliet Manila! We have received your order and will process it shortly.</p>
          <br>
          <p>Payment Method: <span style="color:#6e815d">${this.paymentMethod}</span></p>
          <p>Order Status: <span style="color:orange">${this.status}</span></p>
          <p>Total Amount: <span style="color:black">${this.totalPrice}</span></p>
          <hr style="color:#6e815d">
          <br>
          <h2>Cash On Delivery</h2>
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        window.alert("Succesful order!");
      }
      /*
      let emailDetail = {
        to: this.orderForm.get('email').value,
        subject: `Order for ${this.orderForm.get('firstName').value}`,  
        html: `<h2>Thank you for your order${this.orderForm.get('firstName').value}!</h2>
        <p>Your total purchase is worth Php ${this.totalPrice} </p>
        <p>We will reply back to you when we have already processed your order!</p>
        `
      }
      */
     
      
        
    } catch (error) {
      window.alert("error")
    }
    //let productArray = [];
    //productArray.push(this.items);
    //console.log("Orders: " + Object.values(this.items));
    //console.log("Total Price is Php " + this.totalPrice);
    //console.log("product array:" + productArray);
    
    
   
  }
   makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    
 }
 
 
  changePayment(payment) {
    console.log(payment)
    if (payment == 'bankTransfer') {
      this.paymentMethod = 'Bank Transfer (BDO,BPI,etc)';
    }
    if (payment == 'gCash') {
      this.paymentMethod = 'G-Cash';
    }
    if (payment == 'cod') {
      this.paymentMethod = 'Cash On Delivery';
    }
  }
     handleClick(value) {
      this.totalPrice = this.itemPrice + value;
      if (value == 90) {
        this.value = value;
        this.shippingMethod = "LBC (Metro Manila)";
      }
      if (value == 165) {
        this.value = value;
        this.shippingMethod = "LBC (Luzon)";
      }
      if (value == 185) {
        this.value = value;
        this.shippingMethod = "LBC (Visayas)";
      }
      if (value == 205) {
        this.value = value;
        this.shippingMethod = "LBC (Mindanao)";
      }
      if (value == 0) {
        this.value = value;
        this.shippingMethod = "Same Day Delivery (COD)";
      }
  }
}


