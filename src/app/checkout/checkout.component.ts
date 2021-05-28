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
  saveSuccess: boolean;
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
      `
      <div style="text-align: center; display: block; width: 100%;">
      <p style="width: 32%; font-weight: 400; display: inline-block;">${name} x${quantity}</p>
      <p style="width: 32%; font-weight: 400; display: inline-block;">${price} Php</p>
      <p style="width: 32%; font-weight: 400; display: inline-block;">${totalPrice} Php</p>
      </div>
      `
    ).join('');

    
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
          subject: `Juliet MNL PH (${this.orderForm.get('firstName').value})`,  
          /*
          html: `<h2>Thank you for your order${this.orderForm.get('firstName').value}!</h2>
          <p>Your total purchase is worth Php ${this.totalPrice} </p>
          <p>We will reply back to you when we have already processed your order!</p>
          `,*/
          html: `
    <div style="width: 100%; height: 100%; display: block;">
    <div style="height: auto; width: 98%; display: block; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); background-color:#e8eceb; text-align: center;">
        <img src="https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-1/p960x960/98183938_227854252000502_8356908293792202752_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=dbb9e7&_nc_aid=0&_nc_ohc=Ee3chpLZSpsAX9lLKo7&_nc_ht=scontent.fmnl3-4.fna&tp=6&oh=418b092d914de1b5e7e2b477817c5b16&oe=60D1FB45" alt="Juliet Manila" style="height: 6em; width:6em; margin:1em 0 1em 0;">
        <h2 style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Order Confirmation</h2>
        <div style="width: 100%; height: auto; display: block; text-align: center; color:#544532;">
            <div style="text-align: left; margin-left: 1em; display:inline-block; width: 45%;">
                <p>Order Number: ${this.orderId}</p>
                <p>${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value}</p>
                <p>${this.orderForm.get('contactNumber').value}</p>
            </div>
            <div style="text-align: right; margin-right: 1em; display: inline-block; width: 45%;">
                <p>${this.paymentMethod}</p>
                <p>${this.shippingMethod}</p>
                <p>${this.orderForm.get('street').value}, ${this.orderForm.get('province').value},${this.orderForm.get('city').value} , ${this.orderForm.get('region').value}</p>
            </div>
        </div>
        <h2 style="font-family: serif; font-weight: 400; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Items Ordered</h2>
        <div style="width: 100%; height: auto; display: block; color:#544532;">
            <div style="text-align: center; display: block; width: 100%;">
                <p style="width: 32%; font-weight: 600; display: inline-block;">Product name</p>
                <p style="width: 32%; font-weight: 600; display: inline-block;">Price per item</p>
                <p style="width: 32%; font-weight: 600; display: inline-block;">Total price</p>
            </div>
            ${this.itemRows}
            <p style="font-weight: 600; text-decoration: underline;">Amount To Pay: ${this.totalPrice} Php (Included Shipping Fee)</p>
        </div>
        <h2 style="font-family: serif; font-weight: 400; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em; margin-top: 3em;">Payment Instructions</h2>
        <p style="font-weight:600;color:#544532;">Please send your payment via bank transfer using the following details
        </p>
        <ul style="color:#544532;">
            <p><span style="font-weight: 600;">Bank:</span> BPI Family Savings Bank</p>
            <p><span style="font-weight: 600;">Account Name:</span> Antonith Joy P. Telesforo</p>
            <p><span style="font-weight: 600;">Account Number:</span> 0429744199</p>
        </ul>
        <p style="font-weight:600;color:#544532; text-align: center;">Once you are done paying for the order/s at a certain bank, please reply to this email with the invoice attached to the message for verification of payment.
        </p>
        <a href="https://julietmnlph.com/faqs"style="padding: 1em 3em; margin-bottom: 5em;margin-top: 3em; background: rgb(209,169,117);
        background: linear-gradient(90deg, rgba(209,169,117,1) 0%, rgba(57,35,9,1) 100%); border: none; color: white; font-weight: 400;text-decoration: none; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); display: inline-block;">Got Any Questions?</a>
    </div>
    </div>
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        this.cartService.clearCart()
        this.saveSuccess = true;
        setTimeout(() => {
            this.router.navigate(['thank-you'])
          }, 2000);
        
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
          <div style="width: 100%; height: 100%; display: block;">
          <div style="height: auto; width: 98%; display: block; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); background-color:#e8eceb; text-align: center;">
              <img src="https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-1/p960x960/98183938_227854252000502_8356908293792202752_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=dbb9e7&_nc_aid=0&_nc_ohc=Ee3chpLZSpsAX9lLKo7&_nc_ht=scontent.fmnl3-4.fna&tp=6&oh=418b092d914de1b5e7e2b477817c5b16&oe=60D1FB45" alt="Juliet Manila" style="height: 6em; width:6em; margin:1em 0 1em 0;">
              <h2 style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Order Confirmation</h2>
              <div style="width: 100%; height: auto; display: block; text-align: center; color:#544532;">
                  <div style="text-align: left; margin-left: 1em; display:inline-block; width: 45%;">
                      <p>Order Number: ${this.orderId}</p>
                      <p>${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value}</p>
                      <p>${this.orderForm.get('contactNumber').value}</p>
                  </div>
                  <div style="text-align: right; margin-right: 1em; display: inline-block; width: 45%;">
                      <p>${this.paymentMethod}</p>
                      <p>${this.shippingMethod}</p>
                      <p>${this.orderForm.get('street').value}, ${this.orderForm.get('province').value},${this.orderForm.get('city').value} , ${this.orderForm.get('region').value}</p>
                  </div>
              </div>
              <h2 style="font-family: serif; font-weight: 400; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Items Ordered</h2>
              <div style="width: 100%; height: auto; display: block; color:#544532;">
                  <div style="text-align: center; display: block; width: 100%;">
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Product name</p>
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Price per item</p>
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Total price</p>
                  </div>
                  ${this.itemRows}
                  <p style="font-weight: 600; text-decoration: underline;">Amount To Pay: ${this.totalPrice} Php (Included Shipping Fee)</p>
              </div>
              <h2 style="font-family: serif; font-weight: 400; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em; margin-top: 3em;">Payment Instructions</h2>
              <p style="font-weight:600;color:#544532;">Please send your payment via G-Cash using the following details
              </p>
              <ul style="color:#544532;">
                  <p><span style="font-weight: 600;">G-Cash Number:</span> 09326584281</p>
                  <p><span style="font-weight: 600;">Message:</span> (Order Number)</p>
              </ul>
              <p style="font-weight:600;color:#544532; text-align: center;">Once you are done paying for the order/s at a certain bank, please reply to this email with the invoice attached to the message for verification of payment.
              </p>
              <a href="https://julietmnlph.com/faqs"style="padding: 1em 3em; margin-bottom: 5em;margin-top: 3em; background: rgb(209,169,117);
              background: linear-gradient(90deg, rgba(209,169,117,1) 0%, rgba(57,35,9,1) 100%); border: none; color: white; font-weight: 400;text-decoration: none; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); display: inline-block;">Got Any Questions?</a>
          </div>
          </div>
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        this.cartService.clearCart()
        this.saveSuccess = true;
        setTimeout(() => {
            this.router.navigate(['thank-you'])
          }, 1000);      }
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
          <div style="width: 100%; height: 100%; display: block;">
          <div style="height: auto; width: 98%; display: block; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); background-color:#e8eceb; text-align: center;">
              <img src="https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-1/p960x960/98183938_227854252000502_8356908293792202752_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=dbb9e7&_nc_aid=0&_nc_ohc=Ee3chpLZSpsAX9lLKo7&_nc_ht=scontent.fmnl3-4.fna&tp=6&oh=418b092d914de1b5e7e2b477817c5b16&oe=60D1FB45" alt="Juliet Manila" style="height: 6em; width:6em; margin:1em 0 1em 0;">
              <h2 style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Order Confirmation</h2>
              <div style="width: 100%; height: auto; display: block; text-align: center; color:#544532;">
                  <div style="text-align: left; margin-left: 1em; display:inline-block; width: 45%;">
                      <p>Order Number: ${this.orderId}</p>
                      <p>${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value}</p>
                      <p>${this.orderForm.get('contactNumber').value}</p>
                  </div>
                  <div style="text-align: right; margin-right: 1em; display: inline-block; width: 45%;">
                      <p>${this.paymentMethod}</p>
                      <p>${this.shippingMethod}</p>
                      <p>${this.orderForm.get('street').value}, ${this.orderForm.get('province').value},${this.orderForm.get('city').value} , ${this.orderForm.get('region').value}</p>
                  </div>
              </div>
              <h2 style="font-family: serif; font-weight: 400; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Items Ordered</h2>
              <div style="width: 100%; height: auto; display: block; color:#544532;">
                  <div style="text-align: center; display: block; width: 100%;">
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Product name</p>
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Price per item</p>
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Total price</p>
                  </div>
                  ${this.itemRows}
                  <p style="font-weight: 600; text-decoration: underline;"Amount To Pay: ${this.totalPrice} Php (Included Shipping Fee)</p>
              </div>
              <h2 style="font-family: serif; font-weight: 400; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em; margin-top: 3em;">Payment Instructions</h2>
              <p style="font-weight:600;color:#544532;">Please send your payment via G-Cash using the following details
              </p>
              <ul style="color:#544532;">
                  <p><span style="font-weight: 600;">G-Cash Number:</span> 09326584281</p>
                  <p><span style="font-weight: 600;">Message:</span> (Order Number)</p>
              </ul>
              <p style="font-weight:600;color:#544532; text-align: center;">Once you are done paying for the order/s at a certain bank, please reply to this email with the invoice attached to the message for verification of payment.
              </p>
              <p style="font-weight:600;color:#544532; text-align: center;">Please also specify your preferred courier when replying with your payment verification invoice. If not, we will assign a courier for you and update you with the details.
              </p>
              <a href="https://julietmnlph.com/faqs"style="padding: 1em 3em; margin-bottom: 5em;margin-top: 3em; background: rgb(209,169,117);
              background: linear-gradient(90deg, rgba(209,169,117,1) 0%, rgba(57,35,9,1) 100%); border: none; color: white; font-weight: 400;text-decoration: none; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); display: inline-block;">Got Any Questions?</a>
          </div>
          </div>
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        this.cartService.clearCart()
        this.saveSuccess = true;
        setTimeout(() => {
            this.router.navigate(['thank-you'])
          }, 1000);      }
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
          <div style="width: 100%; height: 100%; display: block;">
          <div style="height: auto; width: 98%; display: block; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); background-color:#e8eceb; text-align: center;">
              <img src="https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-1/p960x960/98183938_227854252000502_8356908293792202752_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=dbb9e7&_nc_aid=0&_nc_ohc=Ee3chpLZSpsAX9lLKo7&_nc_ht=scontent.fmnl3-4.fna&tp=6&oh=418b092d914de1b5e7e2b477817c5b16&oe=60D1FB45" alt="Juliet Manila" style="height: 6em; width:6em; margin:1em 0 1em 0;">
              <h2 style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Order Confirmation</h2>
              <div style="width: 100%; height: auto; display: block; text-align: center; color:#544532;">
                  <div style="text-align: left; margin-left: 1em; display:inline-block; width: 45%;">
                      <p>Order Number: ${this.orderId}</p>
                      <p>${this.orderForm.get('firstName').value} ${this.orderForm.get('lastName').value}</p>
                      <p>${this.orderForm.get('contactNumber').value}</p>
                  </div>
                  <div style="text-align: right; margin-right: 1em; display: inline-block; width: 45%;">
                      <p>${this.paymentMethod}</p>
                      <p>${this.shippingMethod}</p>
                      <p>${this.orderForm.get('street').value}, ${this.orderForm.get('province').value},${this.orderForm.get('city').value} , ${this.orderForm.get('region').value}</p>
                  </div>
              </div>
              <h2 style="font-family: serif; font-weight: 400; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Items Ordered</h2>
              <div style="width: 100%; height: auto; display: block; color:#544532;">
                  <div style="text-align: center; display: block; width: 100%;">
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Product name</p>
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Price per item</p>
                      <p style="width: 32%; font-weight: 600; display: inline-block;">Total price</p>
                  </div>
                  ${this.itemRows}
                  <p style="font-weight: 600; text-decoration: underline;">Amount To Pay: ${this.totalPrice} Php (Included Shipping Fee)</p>
              </div>
              <h2 style="font-family: serif; font-weight: 400; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em; margin-top: 3em;">Payment Instructions</h2>
              <p style="font-weight:600;color:#544532;">Please send your payment via bank transfer using the following details
              </p>
              <ul style="color:#544532;">
                  <p><span style="font-weight: 600;">Bank:</span> BPI Family Savings Bank</p>
                  <p><span style="font-weight: 600;">Account Name:</span> Antonith Joy P. Telesforo</p>
                  <p><span style="font-weight: 600;">Account Number:</span> 0429744199</p>
              </ul>
              <p style="font-weight:600;color:#544532; text-align: center;">Once you are done paying for the order/s at a certain bank, please reply to this email with the invoice attached to the message for verification of payment.
              </p>
              <p style="font-weight:600;color:#544532; text-align: center;">Please also specify your preferred courier when replying with your payment verification invoice. If not, we will assign a courier for you and update you with the details.
              </p>
              <a href="https://julietmnlph.com/faqs"style="padding: 1em 3em; margin-bottom: 5em;margin-top: 3em; background: rgb(209,169,117);
              background: linear-gradient(90deg, rgba(209,169,117,1) 0%, rgba(57,35,9,1) 100%); border: none; color: white; font-weight: 400;text-decoration: none; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); display: inline-block;">Got Any Questions?</a>
          </div>
          </div>  
          `
        }
        this.orderService.addOrder(cartDetail);
        this.orderService.sendReceipt(emailDetail);
        this.cartService.clearCart()
        this.saveSuccess = true;
        setTimeout(() => {
            this.router.navigate(['thank-you'])
          }, 1000);      }
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
    this.updateStock = this.stocks.map(({_id,stock_quantity,orders}) => {
        this.stockForm = this.formBuilder.group({
            _id: _id,
            stock_quantity: stock_quantity,
            orders: orders
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


