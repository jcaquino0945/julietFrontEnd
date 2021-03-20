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
import { ProductService } from '../services/product.service';
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
  stocks = this.cartService.getStocks();
  totalPrice = this.cartService.totalPrice();
  itemPrice = this.cartService.itemPrice();
  cartDetail: any;
  orderForm: FormGroup;
  stockForm: FormGroup;
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
  itemRows;
  updateStock;

  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private cartService: CartService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private responsive: ResponsiveService,
    private router: Router,
    private productService: ProductService,


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
   
     this.itemRows = this.items.map(({name, quantity, totalPrice, price}) =>
      `<tr>
      <td>
          <p>${name}</p>
      </th>
      <td>
          <p>x${quantity}</p>
      </td>
      <td>
          <p>Php ${price}</p>
      </td>
      <td>
          <p>Php ${totalPrice}</p>
      </td>
      </tr>`
    ).join('');

    this.updateStock = this.stocks.map(({_id,stock_quantity}) => {
        this.stockForm = this.formBuilder.group({
            _id: _id,
            stock_quantity: stock_quantity,
        });
        this.productService.modifyStock(_id,this.stockForm.value).subscribe((res) => {
            console.log(res)
            console.log('stock updated');
        },
        (error) => {
            console.log(error);
        }
        )
   });
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
          <div style="background-color: #ffffff" style="height: auto; width: 100%;">
        <h2 style="text-align:center;">Juliet Manila</h2>
        <div class="row">
            <div class="col"
                style="margin-top: 10vh; margin-bottom: 10vh; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
                <h1> Order Confirmation</h1>
            </div>
            <div class="col"
                style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <p> Hello <i> ${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value},</i> </p>
                <p>Thank you for ordering from Juliet Manila! We will now process your order once we have received your payment! Payment instructions for <i>${this.paymentMethod}</i> can be found at the end of this email</p>
            </div>
            <div class="col"
                style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <span>Order Number: <span style="font-weight:bold">${this.orderId}<span></span>
            </div>
        </div>
        <h5
            style="font-size: 20pt; text-align: left; padding-bottom: 1rem; margin: 1rem; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            items
            ordered </h5>
        <hr style="margin: 1rem;">
        <table style="width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <tr>
                <th>
                    <p> (Product name) </p>
                </th>
                <th>
                    <p> (Quantity) </p>
                </th>
                <th>
                    <p> (Price per item) </p>
                </th>
                <th>
                    <p> (Total Price) </p>
                </th>
            </tr>
            ${this.itemRows}
        </table>
        <div class="row"
            style="text-align: right; margin-right: 10vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div class="col" style="width: 90%; margin-top: 5vh;">
                <p style="font-weight:bold"> Total: Php ${this.totalPrice} <span style="font-weight:normal; color: gray;">(Includes Shipping Fee)</span></p>
            </div>
        </div>
        <hr style="margin: 1rem;">
        <h5 style="font-size: 20pt; text-align: left; padding-bottom: 1rem; margin-left: 1rem;
        margin-top: 7vh; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            delivery
            details </h5>
        <hr style="margin: 1rem;">
        <table
            style="width: 100%; text-align: left; margin: 0 0 0 1rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <tr>
                <th>
                    <p> Shipping Method: </p>
                </th>
                <th>
                    <p> ${this.shippingMethod} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Delivery Address: </p>
                </th>
                <th>
                    <p> ${this.orderForm.get('street').value} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Order Status: </p>
                </th>
                <th>
                    <p> ${this.status} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Payment Method: </p>
                </th>
                <th>
                    <p> ${this.paymentMethod} </p>
                </th>
            </tr>
           
        </table>
        <hr style="margin: 1rem;">
        <h5
            style="text-align: left; padding-bottom: 1rem; margin-left: 1rem;
        margin-top: 7vh; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20pt;">
            payment instructions </h5>
        <hr style="margin: 1rem;">
        <span
            style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
            Please send your payment via bank transfer using the following details
        </span>
        <ul style="padding-bottom: 10px;">
            <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Bank:
                <strong><u> BPI Family Savings Bank</u></strong></li>
            <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Account Name:
                <strong><u> Antonith Joy P. Telesforo</u></strong></li>
            <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Account Number:
                <strong><u> 0429744199 </u></strong></li>
        </ul>
        <span
            style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
            <strong> * </strong> <span style="font-weight:bold;">Once you are done paying for the order/s at a certain bank, please reply to this
            email with the invoice attached to the message for verification of payment.</span>
        </span>
        <p
            style="text-align: left; margin: 1rem 1rem 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding-bottom: 3vh;">
            <strong> * </strong>If you have any inquiries or questions, feel free to reply to this email.
        </p>
        <!-- <hr style="margin: 1rem;"> -->
    </div>
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        window.alert("Succesful order!");
        this.cartService.clearCart()
        this.router.navigate(['home'])
        
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
          <div style="background-color: #ffffff" style="height: auto; width: 100%;">
          <h2 style="text-align:center;">Juliet Manila</h2>
          <div class="row">
              <div class="col"
                  style="margin-top: 10vh; margin-bottom: 10vh; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
                  <h1> Order Confirmation</h1>
              </div>
              <div class="col"
                  style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <p> Hello <i> ${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value},</i> </p>
                  <p>Thank you for ordering from Juliet Manila! We will now process your order once we have received your payment! Payment instructions for <i>${this.paymentMethod}</i> can be found at the end of this email</p>
              </div>
              <div class="col"
                  style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <span>Order Number: <span style="font-weight:bold">${this.orderId}<span></span>
              </div>
          </div>
          <h5
              style="font-size: 20pt; text-align: left; padding-bottom: 1rem; margin: 1rem; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              items
              ordered </h5>
          <hr style="margin: 1rem;">
          <table style="width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <tr>
                  <th>
                      <p> (Product name) </p>
                  </th>
                  <th>
                      <p> (Quantity) </p>
                  </th>
                  <th>
                      <p> (Price per item) </p>
                  </th>
                  <th>
                      <p> (Total Price) </p>
                  </th>
              </tr>
              ${this.itemRows}
          </table>
          <div class="row"
              style="text-align: right; margin-right: 10vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <div class="col" style="width: 90%; margin-top: 5vh;">
                  <p style="font-weight:bold"> Total: Php ${this.totalPrice} <span style="font-weight:normal; color: gray;">(Includes Shipping Fee)</span></p>
              </div>
          </div>
          <hr style="margin: 1rem;">
          <h5 style="font-size: 20pt; text-align: left; padding-bottom: 1rem; margin-left: 1rem;
          margin-top: 7vh; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              delivery
              details </h5>
          <hr style="margin: 1rem;">
          <table
              style="width: 100%; text-align: left; margin: 0 0 0 1rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <tr>
                  <th>
                      <p> Shipping Method: </p>
                  </th>
                  <th>
                      <p> ${this.shippingMethod} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Delivery Address: </p>
                  </th>
                  <th>
                      <p> ${this.orderForm.get('street').value} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Order Status: </p>
                  </th>
                  <th>
                      <p> ${this.status} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Payment Method: </p>
                  </th>
                  <th>
                      <p> ${this.paymentMethod} </p>
                  </th>
              </tr>
             
          </table>
          <hr style="margin: 1rem;">
          <h5
              style="text-align: left; padding-bottom: 1rem; margin-left: 1rem;
          margin-top: 7vh; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20pt;">
              payment instructions </h5>
          <hr style="margin: 1rem;">
          <span
              style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
              Please send your payment via G-Cash using the following details
          </span>
          <ul style="padding-bottom: 10px;">
              <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> G-Cash Number:
                  <strong><u> 09326584281</u></strong></li>
              <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Message:
                  <strong><u> (Your Name)</u></strong></li>
          </ul>
          <span
              style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
              <strong> * </strong> <span style="font-weight:bold;">Once you are done paying for the order/s at a certain bank, please reply to this
              email with the invoice attached to the message for verification of payment.</span>
          </span>
          <p
              style="text-align: left; margin: 1rem 1rem 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding-bottom: 3vh;">
              <strong> * </strong>If you have any inquiries or questions, feel free to reply to this email.
          </p>
          <!-- <hr style="margin: 1rem;"> -->
      </div>
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        window.alert("Succesful order!");
        this.cartService.clearCart()
        this.router.navigate(['home'])
      }
      if (this.shippingMethod == 'Same Day Delivery (COD)' && this.paymentMethod == 'G-Cash') {
        let emailDetail = {
          to: this.orderForm.get('email').value,
          subject: `Order for ${this.orderForm.get('firstName').value}`,  
          /*
          html: `<h2>Thank you for your order${this.orderForm.get('firstName').value}!</h2>
          <p>Your total purchase is worth Php ${this.totalPrice} </p>
          <p>We will reply back to you when we have already processed your order!</p>
          `,*/
          html: `
          <div style="background-color: #ffffff" style="height: auto; width: 100%;">
          <h2 style="text-align:center;">Juliet Manila</h2>
          <div class="row">
              <div class="col"
                  style="margin-top: 10vh; margin-bottom: 10vh; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
                  <h1> Order Confirmation</h1>
              </div>
              <div class="col"
                  style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <p> Hello <i> ${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value},</i> </p>
                  <p>Thank you for ordering from Juliet Manila! We will now process your order once we have received your payment! Payment instructions for <i>${this.paymentMethod}</i> can be found at the end of this email</p>
              </div>
              <div class="col"
                  style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <span>Order Number: <span style="font-weight:bold">${this.orderId}<span></span>
              </div>
          </div>
          <h5
              style="font-size: 20pt; text-align: left; padding-bottom: 1rem; margin: 1rem; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              items
              ordered </h5>
          <hr style="margin: 1rem;">
          <table style="width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <tr>
                  <th>
                      <p> (Product name) </p>
                  </th>
                  <th>
                      <p> (Quantity) </p>
                  </th>
                  <th>
                      <p> (Price per item) </p>
                  </th>
                  <th>
                      <p> (Total Price) </p>
                  </th>
              </tr>
              ${this.itemRows}
          </table>
          <div class="row"
              style="text-align: right; margin-right: 10vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <div class="col" style="width: 90%; margin-top: 5vh;">
                  <p style="font-weight:bold"> Total: Php ${this.totalPrice} <span style="font-weight:normal; color: gray;">(Includes Shipping Fee)</span></p>
              </div>
          </div>
          <hr style="margin: 1rem;">
          <h5 style="font-size: 20pt; text-align: left; padding-bottom: 1rem; margin-left: 1rem;
          margin-top: 7vh; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              delivery
              details </h5>
          <hr style="margin: 1rem;">
          <table
              style="width: 100%; text-align: left; margin: 0 0 0 1rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <tr>
                  <th>
                      <p> Shipping Method: </p>
                  </th>
                  <th>
                      <p> ${this.shippingMethod} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Delivery Address: </p>
                  </th>
                  <th>
                      <p> ${this.orderForm.get('street').value} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Order Status: </p>
                  </th>
                  <th>
                      <p> ${this.status} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Payment Method: </p>
                  </th>
                  <th>
                      <p> ${this.paymentMethod} </p>
                  </th>
              </tr>
             
          </table>
          <hr style="margin: 1rem;">
          <h5
              style="text-align: left; padding-bottom: 1rem; margin-left: 1rem;
          margin-top: 7vh; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20pt;">
              payment instructions </h5>
          <hr style="margin: 1rem;">
          <span
              style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
              Please send your payment via G-Cash using the following details
          </span>
          <ul style="padding-bottom: 10px;">
              <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> G-Cash Number:
                  <strong><u> 09326584281</u></strong></li>
              <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Message:
                  <strong><u> (Your Name)</u></strong></li>
          </ul>
          <span
              style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
              <strong> * </strong> <span style="font-weight:bold;">Once you are done paying for the order/s at a certain bank, please reply to this
              email with the invoice attached to the message for verification of payment.</span>
          </span>
          <br>
          <br>
          <span
          style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
          <strong> * </strong> <span style="font-weight:bold;">Please also specify your preferred courier when replying with your payment verification invoice. If not, we will assign a courier for you and update you with the details.</span>
      </span>
          <p
              style="text-align: left; margin: 1rem 1rem 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding-bottom: 3vh;">
              <strong> * </strong>If you have any inquiries or questions, feel free to reply to this email.
          </p>
          <!-- <hr style="margin: 1rem;"> -->
      </div>
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        window.alert("Succesful order!");
        this.cartService.clearCart()
        this.router.navigate(['home'])
      }
      if (this.shippingMethod == 'Same Day Delivery (COD)' && this.paymentMethod == 'Bank Transfer (BDO,BPI,etc)') {
        let emailDetail = {
          to: this.orderForm.get('email').value,
          subject: `Order for ${this.orderForm.get('firstName').value}`,  
          /*
          html: `<h2>Thank you for your order${this.orderForm.get('firstName').value}!</h2>
          <p>Your total purchase is worth Php ${this.totalPrice} </p>
          <p>We will reply back to you when we have already processed your order!</p>
          `,*/
          html: `
          <div style="background-color: #ffffff" style="height: auto; width: 100%;">
          <h2 style="text-align:center;">Juliet Manila</h2>
          <div class="row">
              <div class="col"
                  style="margin-top: 10vh; margin-bottom: 10vh; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
                  <h1> Order Confirmation</h1>
              </div>
              <div class="col"
                  style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <p> Hello <i> ${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value},</i> </p>
                  <p>Thank you for ordering from Juliet Manila! We will now process your order once we have received your payment! Payment instructions for <i>${this.paymentMethod}</i> can be found at the end of this email</p>
              </div>
              <div class="col"
                  style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <span>Order Number: <span style="font-weight:bold">${this.orderId}<span></span>
              </div>
          </div>
          <h5
              style="font-size: 20pt; text-align: left; padding-bottom: 1rem; margin: 1rem; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              items
              ordered </h5>
          <hr style="margin: 1rem;">
          <table style="width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <tr>
                  <th>
                      <p> (Product name) </p>
                  </th>
                  <th>
                      <p> (Quantity) </p>
                  </th>
                  <th>
                      <p> (Price per item) </p>
                  </th>
                  <th>
                      <p> (Total Price) </p>
                  </th>
              </tr>
              ${this.itemRows}
          </table>
          <div class="row"
              style="text-align: right; margin-right: 10vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <div class="col" style="width: 90%; margin-top: 5vh;">
                  <p style="font-weight:bold"> Total: Php ${this.totalPrice} <span style="font-weight:normal; color: gray;">(Includes Shipping Fee)</span></p>
              </div>
          </div>
          <hr style="margin: 1rem;">
          <h5 style="font-size: 20pt; text-align: left; padding-bottom: 1rem; margin-left: 1rem;
          margin-top: 7vh; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              delivery
              details </h5>
          <hr style="margin: 1rem;">
          <table
              style="width: 100%; text-align: left; margin: 0 0 0 1rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <tr>
                  <th>
                      <p> Shipping Method: </p>
                  </th>
                  <th>
                      <p> ${this.shippingMethod} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Delivery Address: </p>
                  </th>
                  <th>
                      <p> ${this.orderForm.get('street').value} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Order Status: </p>
                  </th>
                  <th>
                      <p> ${this.status} </p>
                  </th>
              </tr>
              <tr>
                  <th>
                      <p> Payment Method: </p>
                  </th>
                  <th>
                      <p> ${this.paymentMethod} </p>
                  </th>
              </tr>
             
          </table>
          <hr style="margin: 1rem;">
          <h5
              style="text-align: left; padding-bottom: 1rem; margin-left: 1rem;
          margin-top: 7vh; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20pt;">
              payment instructions </h5>
          <hr style="margin: 1rem;">
          <span
              style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
              Please send your payment via Bank Transfer (BDO,BPI,etc) using the following details
          </span>
          <ul style="padding-bottom: 10px;">
          <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Bank:
          <strong><u> BPI Family Savings Bank</u></strong></li>
          <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Account Name:
              <strong><u> Antonith Joy P. Telesforo</u></strong></li>
          <li style="font-size: 15pt; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> Account Number:
              <strong><u> 0429744199 </u></strong></li>
          </ul>
          <span
              style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
              <strong> * </strong> <span style="font-weight:bold;">Once you are done paying for the order/s at a certain bank, please reply to this
              email with the invoice attached to the message for verification of payment.</span>
          </span>
          <br>
          <br>
          <span
          style="width: 100%; text-align: left; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1rem;">
          <strong> * </strong> <span style="font-weight:bold;">Please also specify your preferred courier when replying with your payment verification invoice. If not, we will assign a courier for you and update you with the details.</span>
      </span>
          <p
              style="text-align: left; margin: 1rem 1rem 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding-bottom: 3vh;">
              <strong> * </strong>If you have any inquiries or questions, feel free to reply to this email.
          </p>
          <!-- <hr style="margin: 1rem;"> -->
      </div>
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        window.alert("Succesful order!");
        this.cartService.clearCart()
        this.router.navigate(['home'])
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
        this.updateStock(); 
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


