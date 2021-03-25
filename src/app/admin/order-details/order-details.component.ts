import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Orders } from '../../models/orders';
import * as _ from 'lodash';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

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
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderIds: string[];
  order: Orders;
  galleryForm: FormGroup;
  errMess: string;
  status: string;
  itemRows;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    sessionStorage.getItem('token')
    this.orderService
      .getOrderIds()
      .subscribe((orderIds) => (this.orderIds = orderIds));

      this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.orderService.getOrder(params['id']);
        })
      )
      .subscribe(
        (order) => {
          this.order = order;
          //this.orderService.setSearchQuery(order.orderId);
          this.status = order.status;
          console.log(order.product)
          this.itemRows = order.product.map(({name, quantity, totalPrice, price}) =>
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
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);

    this.galleryForm = this.formBuilder.group({
      status: ''
    });

  }

  updateStatus(id) {
    this.orderService.updateOrder(id,this.galleryForm.value).subscribe(
      (res) => {
        window.alert('Order status updated! Email sent to ' + this.order.email);
        document.getElementById('close').click(); // close modal 
        //console.log(this.orderService.getSearchQuery())
      },
      (error) => {
        console.log(error);
      }
    );
    this.orderService
      .getOrderIds()
      .subscribe((orderIds) => (this.orderIds = orderIds));

      this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.orderService.getOrder(params['id']);
        })
      )
      .subscribe(
        (order) => {
          this.order = order;
          //this.orderService.setSearchQuery(order.orderId);
          this.status = order.status;
          this.updateOrderEmail();
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);
    
}

  updateOrderEmail() {
    status = this.status;
    console.log(status);
    if (status == 'Processing Order') {
      let emailDetail = {
        to: this.order.email,
        subject: `Order for ${this.order.firstName}`,  
        html: `
        <div style="background-color: #ffffff" style="height: auto; width: 100%;">
        <h2 style="text-align:center;">Juliet Manila</h2>
        <div class="row">
            <div class="col"
                style="margin-top: 10vh; margin-bottom: 10vh; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
                <h1> Processing Order</h1>
            </div>
            <div class="col"
                style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <p> Hello <i> ${this.order.firstName} ${this.order.lastName},</i> </p>
                <p>We have received your payment! We are now processing your order and will reply back to you when your order is now being delivered!</p>
            </div>
            <div class="col"
                style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <span>Order Number: <span style="font-weight:bold">${this.order.orderId}<span></span>
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
                <p style="font-weight:bold"> Total: Php ${this.order.totalPrice} <span style="font-weight:normal; color: gray;">(Includes Shipping Fee)</span></p>
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
                    <p> ${this.order.shippingMethod} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Delivery Address: </p>
                </th>
                <th>
                    <p> ${this.order.street} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Order Status: </p>
                </th>
                <th>
                    <p> ${this.order.status} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Payment Method: </p>
                </th>
                <th>
                    <p> ${this.order.paymentMethod} </p>
                </th>
            </tr>
           
        </table>
        <hr style="margin: 1rem;">
        <p
            style="text-align: left; margin: 1rem 1rem 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding-bottom: 3vh;">
            <strong> * </strong>If you have any inquiries or questions, feel free to reply to this email.
        </p>
        <!-- <hr style="margin: 1rem;"> -->
    </div>
        `
      }
      this.orderService.sendReceipt(emailDetail)
    }
    if (status == 'For Delivery') {
      let emailDetail = {
        to: this.order.email,
        subject: `Order for ${this.order.firstName}`,  
        html: `
        <div style="background-color: #ffffff" style="height: auto; width: 100%;">
        <h2 style="text-align:center;">Juliet Manila</h2>
        <div class="row">
            <div class="col"
                style="margin-top: 10vh; margin-bottom: 10vh; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
                <h1>For Delivery</h1>
            </div>
            <div class="col"
                style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <p> Hello <i> ${this.order.firstName} ${this.order.lastName},</i> </p>
                <p>We have now processed your order and your items are now being delivered to you! We will reach out to you if there are any updates on your order!</p>
            </div>
            <div class="col"
                style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <span>Order Number: <span style="font-weight:bold">${this.order.orderId}<span></span>
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
                <p style="font-weight:bold"> Total: Php ${this.order.totalPrice} <span style="font-weight:normal; color: gray;">(Includes Shipping Fee)</span></p>
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
                    <p> ${this.order.shippingMethod} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Delivery Address: </p>
                </th>
                <th>
                    <p> ${this.order.street} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Order Status: </p>
                </th>
                <th>
                    <p> ${this.order.status} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Payment Method: </p>
                </th>
                <th>
                    <p> ${this.order.paymentMethod} </p>
                </th>
            </tr>
           
        </table>
        <hr style="margin: 1rem;">
        <p
            style="text-align: left; margin: 1rem 1rem 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding-bottom: 3vh;">
            <strong> * </strong>If you have any inquiries or questions, feel free to reply to this email.
        </p>
        <!-- <hr style="margin: 1rem;"> -->
    </div>
        `
      }
      this.orderService.sendReceipt(emailDetail)
    }
    if (status == 'Transaction Complete') {
      let emailDetail = {
        to: this.order.email,
        subject: `Order for ${this.order.firstName}`,  
        html: `
        <div style="background-color: #ffffff" style="height: auto; width: 100%;">
        <h2 style="text-align:center;">Juliet Manila</h2>
        <div class="row">
            <div class="col"
                style="margin-top: 10vh; margin-bottom: 10vh; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
                <h1>Order Received!</h1>
            </div>
            <div class="col"
                style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <p> Hello <i> ${this.order.firstName} ${this.order.lastName},</i> </p>
                <p>Transaction is now complete! Thank you for ordering from Juliet Manila and we hope you love our products. If you want to order again just visit our website!</p>
            </div>
            <div class="col"
                style="margin: 10vh; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <span>Order Number: <span style="font-weight:bold">${this.order.orderId}<span></span>
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
                <p style="font-weight:bold"> Total: Php ${this.order.totalPrice} <span style="font-weight:normal; color: gray;">(Includes Shipping Fee)</span></p>
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
                    <p> ${this.order.shippingMethod} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Delivery Address: </p>
                </th>
                <th>
                    <p> ${this.order.street} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Order Status: </p>
                </th>
                <th>
                    <p> ${this.order.status} </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p> Payment Method: </p>
                </th>
                <th>
                    <p> ${this.order.paymentMethod} </p>
                </th>
            </tr>
           
        </table>
        <hr style="margin: 1rem;">
        <p
            style="text-align: left; margin: 1rem 1rem 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding-bottom: 3vh;">
            <strong> * </strong>If you have any inquiries or questions, feel free to reply to this email.
        </p>
        <!-- <hr style="margin: 1rem;"> -->
    </div>
        `
      }
      this.orderService.sendReceipt(emailDetail)
    }
    this.orderService
      .getOrderIds()
      .subscribe((orderIds) => (this.orderIds = orderIds));

      this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.orderService.getOrder(params['id']);
        })
      )
      .subscribe(
        (order) => {
          this.order = order;
          //this.orderService.setSearchQuery(order.orderId);
          this.status = order.status;
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);

    this.galleryForm = this.formBuilder.group({
      status: ''
    });
  }
}
