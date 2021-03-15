import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Orders } from '../../models/orders';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dailyOrders: Orders[];
  weeklyOrders: Orders[];
  monthlyOrders: Orders[];
  dailySales: string;
  weeklySales: string;
  monthlySales: string;
  errMess: string;
  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
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
  }
}
