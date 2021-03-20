import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Orders } from '../../models/orders';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Product } from 'src/app/models/product';
import { CMS } from '../../models/cms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  orders: Orders[];
  dailyOrders: Orders[];
  weeklyOrders: Orders[];
  monthlyOrders: Orders[];
  dailySales: string;
  weeklySales: string;
  monthlySales: string;
  errMess: string;
  bestsellers = [];
  ribbon: CMS[];
  cmsForm: FormGroup;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private cms: CmsService
  ) {}

  ngOnInit(): void {
    // for bestselling items kaso not working :<
    // this.orderService.getOrders().subscribe(
    //   (orders) =>
    //     (this.bestsellers = _.uniq(
    //       _.concat(...orders.map((order) => order.products)).map((product) => {
    //         return {
    //           ...product,
    //           orderTimes: _.concat(
    //             ...orders.map((order) =>
    //               order.products.map((product) => product)
    //             )
    //           )
    //             .filter((prod) => prod.name === product.name)
    //             .map((product) => product.quantity)
    //             .reduce((accumulator, current) => accumulator + current, 0),
    //         };
    //       })
    //     ))
    // );

    // console.log(this.bestsellers);

    // orders
    this.orderService.getOrders().subscribe(
      (dailyOrders) =>
        (this.dailyOrders = dailyOrders.filter((order) =>
          moment(order.datePurchased).isSame(moment(), 'D')
        )),
      (errMess) => (this.errMess = <any>errMess)
    );

    this.orderService.getOrders().subscribe(
      (weeklyOrders) =>
        (this.weeklyOrders = weeklyOrders.filter((order) =>
          moment(order.datePurchased).isSame(moment(), 'W')
        )),
      (errMess) => (this.errMess = <any>errMess)
    );

    this.orderService.getOrders().subscribe(
      (monthlyOrders) =>
        (this.monthlyOrders = monthlyOrders.filter((order) =>
          moment(order.datePurchased).isSame(moment(), 'M')
        )),
      (errMess) => (this.errMess = <any>errMess)
    );

    // sales
    this.orderService.getOrders().subscribe(() => {
      this.dailySales = this.dailyOrders
        .map((order) => order.totalPrice)
        .reduce((accumulator, current) => accumulator + current, 0)
        .toFixed(2);
    });

    this.orderService.getOrders().subscribe(() => {
      this.weeklySales = this.weeklyOrders
        .map((order) => order.totalPrice)
        .reduce((accumulator, current) => accumulator + current, 0)
        .toFixed(2);
    });

    this.orderService.getOrders().subscribe(() => {
      this.monthlySales = this.monthlyOrders
        .map((order) => order.totalPrice)
        .reduce((accumulator, current) => accumulator + current, 0)
        .toFixed(2);
    });

    // this.cmsForm = this.formBuilder.group({
    //   ribbon: [null, Validators.required],
    // });
  }
}
