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
  saveSuccess: boolean;
  saveFailure: boolean;
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
          `
          <div style="text-align: center; display: block; width: 100%;">
          <p style="width: 32%; font-weight: 400; display: inline-block;">${name} x${quantity}</p>
          <p style="width: 32%; font-weight: 400; display: inline-block;">${price} Php</p>
          <p style="width: 32%; font-weight: 400; display: inline-block;">${totalPrice} Php</p>
          </div>
          `
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
        //this.saveSuccess = true;
        document.getElementById('close').click(); // close modal 
        console.log(this.orderService.getSearchQuery())
      },
      (error) => {
        //this.saveFailure = true
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
        <div style="width: 100%; height: 100%; display: block;">
        <div style="height: auto; width: 98%; display: block; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); background-color:#e8eceb; text-align: center;">
            <img src="https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-1/p960x960/98183938_227854252000502_8356908293792202752_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=dbb9e7&_nc_aid=0&_nc_ohc=Ee3chpLZSpsAX9lLKo7&_nc_ht=scontent.fmnl3-4.fna&tp=6&oh=418b092d914de1b5e7e2b477817c5b16&oe=60D1FB45" alt="Juliet Manila" style="height: 6em; width:6em; margin:1em 0 1em 0;">
            <h2 style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Processing Order</h2>
            <p style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; margin:1em">We are now processing your order. Feel free to contact us for any inquiries</p>
            <div style="width: 100%; height: auto; display: block; text-align: center; color:#544532;">
                <div style="text-align: left; margin-left: 1em; display:inline-block; width: 45%;">
                    <p>Order Number: ${this.order.orderId}</p>
                    <p>${this.order.firstName} ${this.order.lastName}</p>
                    <p>${this.order.contactNumber}</p>
                </div>
                <div style="text-align: right; margin-right: 1em; display: inline-block; width: 45%;">
                    <p>${this.order.paymentMethod}</p>
                    <p>${this.order.shippingMethod}</p>
                    <p>${this.order.street}, ${this.order.province}, ${this.order.city}, ${this.order.region}</p>
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
                <p style="font-weight: 600; text-decoration: underline;">Amount To Pay: ${this.order.totalPrice} Php (Included Shipping Fee)</p>
            </div>
            <a href="https://julietmnlph.com/faqs"style="padding: 1em 3em; margin-bottom: 5em;margin-top: 3em; background: rgb(209,169,117);
            background: linear-gradient(90deg, rgba(209,169,117,1) 0%, rgba(57,35,9,1) 100%); border: none; color: white; font-weight: 400;text-decoration: none; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); display: inline-block;">Got Any Questions?</a>
        </div>
        </div>
        `
      }
      try {
        this.orderService.sendReceipt(emailDetail)
        this.saveSuccess = true;
        document.getElementById('close').click(); // close modal 
      } catch (error) {
        this.saveFailure = true
        console.log(error);
      } 
      
    }
    if (status == 'For Delivery') {
      let emailDetail = {
        to: this.order.email,
        subject: `Order for ${this.order.firstName}`,  
        html: `
        <div style="width: 100%; height: 100%; display: block;">
        <div style="height: auto; width: 98%; display: block; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); background-color:#e8eceb; text-align: center;">
            <img src="https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-1/p960x960/98183938_227854252000502_8356908293792202752_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=dbb9e7&_nc_aid=0&_nc_ohc=Ee3chpLZSpsAX9lLKo7&_nc_ht=scontent.fmnl3-4.fna&tp=6&oh=418b092d914de1b5e7e2b477817c5b16&oe=60D1FB45" alt="Juliet Manila" style="height: 6em; width:6em; margin:1em 0 1em 0;">
            <h2 style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">For Delivery</h2>
            <p style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; margin:1em">We are now delivering your order to you!. Feel free to contact us for any inquiries</p>
            <div style="width: 100%; height: auto; display: block; text-align: center; color:#544532;">
                <div style="text-align: left; margin-left: 1em; display:inline-block; width: 45%;">
                    <p>Order Number: ${this.order.orderId}</p>
                    <p>${this.order.firstName} ${this.order.lastName}</p>
                    <p>${this.order.contactNumber}</p>
                </div>
                <div style="text-align: right; margin-right: 1em; display: inline-block; width: 45%;">
                    <p>${this.order.paymentMethod}</p>
                    <p>${this.order.shippingMethod}</p>
                    <p>${this.order.street}, ${this.order.province}, ${this.order.city}, ${this.order.region}</p>
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
                <p style="font-weight: 600; text-decoration: underline;">Amount To Pay: ${this.order.totalPrice} Php (Included Shipping Fee)</p>
            </div>
            <a href="https://julietmnlph.com/faqs"style="padding: 1em 3em; margin-bottom: 5em;margin-top: 3em; background: rgb(209,169,117);
            background: linear-gradient(90deg, rgba(209,169,117,1) 0%, rgba(57,35,9,1) 100%); border: none; color: white; font-weight: 400;text-decoration: none; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); display: inline-block;">Got Any Questions?</a>
        </div>
        </div>
        `
      }
      try {
        this.orderService.sendReceipt(emailDetail)
        this.saveSuccess = true;
        document.getElementById('close').click(); // close modal 
      } catch (error) {
        this.saveFailure = true
        console.log(error);
      } 
    }
    if (status == 'Transaction Complete') {
      let emailDetail = {
        to: this.order.email,
        subject: `Order for ${this.order.firstName}`,  
        html: `
        <div style="width: 100%; height: 100%; display: block;">
        <div style="height: auto; width: 98%; display: block; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); background-color:#e8eceb; text-align: center;">
            <img src="https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-1/p960x960/98183938_227854252000502_8356908293792202752_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=dbb9e7&_nc_aid=0&_nc_ohc=Ee3chpLZSpsAX9lLKo7&_nc_ht=scontent.fmnl3-4.fna&tp=6&oh=418b092d914de1b5e7e2b477817c5b16&oe=60D1FB45" alt="Juliet Manila" style="height: 6em; width:6em; margin:1em 0 1em 0;">
            <h2 style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; font-size: 1.4em; margin-bottom: 1em;">Transaction Complete!</h2>
            <p style="font-family: serif; font-weight: 600; color:#544532; font-style: italic; margin:1em">Transaction is now complete! Thank you for shopping with Julient MNL PH!</p>
            <div style="width: 100%; height: auto; display: block; text-align: center; color:#544532;">
                <div style="text-align: left; margin-left: 1em; display:inline-block; width: 45%;">
                    <p>Order Number: ${this.order.orderId}</p>
                    <p>${this.order.firstName} ${this.order.lastName}</p>
                    <p>${this.order.contactNumber}</p>
                </div>
                <div style="text-align: right; margin-right: 1em; display: inline-block; width: 45%;">
                    <p>${this.order.paymentMethod}</p>
                    <p>${this.order.shippingMethod}</p>
                    <p>${this.order.street}, ${this.order.province}, ${this.order.city}, ${this.order.region}</p>
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
                <p style="font-weight: 600; text-decoration: underline;">Amount To Pay: ${this.order.totalPrice} Php (Included Shipping Fee)</p>
            </div>
            <a href="https://julietmnlph.com/faqs"style="padding: 1em 3em; margin-bottom: 5em;margin-top: 3em; background: rgb(209,169,117);
            background: linear-gradient(90deg, rgba(209,169,117,1) 0%, rgba(57,35,9,1) 100%); border: none; color: white; font-weight: 400;text-decoration: none; box-shadow: 0px 6px 12px -1px rgba(0,0,0,0.75); display: inline-block;">Got Any Questions?</a>
        </div>
        </div>
        `
      }
      try {
        this.orderService.sendReceipt(emailDetail)
        this.saveSuccess = true;
        document.getElementById('close').click(); // close modal 
      } catch (error) {
        this.saveFailure = true
        console.log(error);
      } 
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
  deleteOrder(id) {
    if (window.confirm('Are you sure?')) {
      this.orderService.deleteOrder(id).subscribe(
        (order) => (this.order = order),
        (errmess) => (this.errMess = <any>errmess)
      );
      console.log('deleted product with id: ' + id);
      this.router.navigate(['/admin/orders']);
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
  }

}
