import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from '../../models/orders';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders$: Orders[];
  errMess: string;

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (orders$) => (this.orders$ = orders$),
      (errMess) => (this.errMess = <any>errMess)
    );
  }
}
