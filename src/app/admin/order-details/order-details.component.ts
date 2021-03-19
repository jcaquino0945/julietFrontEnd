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
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
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
  updateStatus(id) {
    this.orderService.updateOrder(id,this.galleryForm.value).subscribe(
      (res) => {
        console.log('Order updated');
        window.alert('Order updated!');
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
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);

    this.galleryForm = this.formBuilder.group({
      status: ''
    });
}

  updateOrderEmail() {
    status = this.status;
    console.log(status);
    if (status == 'Processing Order') {
      let emailDetail = {
        to: this.order.email,
        subject: `Order for ${this.order.firstName}`,  
        html: `
        <h1>We have received your payment, we are now processing your order!</h1>
        `
      }
      console.log('Email Sent')
      this.orderService.sendReceipt(emailDetail)
    }
    if (status == 'For Delivery') {
      let emailDetail = {
        to: this.order.email,
        subject: `Order for ${this.order.firstName}`,  
        html: `
        <h1>Your order has now been processed and it will be now be delivered to you! Feel free to contact us for updates</h1>
        `
      }
      console.log('Email Sent')
      this.orderService.sendReceipt(emailDetail)
    }
    if (status == 'Transaction Complete') {
      let emailDetail = {
        to: this.order.email,
        subject: `Order for ${this.order.firstName}`,  
        html: `
        <h1>Thank you for ordering with juliet!</h1>
        `
      }
      console.log('Email Sent')
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
