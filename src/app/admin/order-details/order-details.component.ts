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
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);
  }
  updateStatus(val) {
    console.log(this.status);

  }
}
