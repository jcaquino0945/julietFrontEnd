import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Orders } from '../../models/orders';
import * as moment from 'moment';
import { OrderService } from 'src/app/services/order.service';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  orders$: Orders[];
  messages$: Contact[];
  errMess: string;
  chart: any;
  constructor(
    private orderService: OrderService,
    private contactService: ContactService,
    ) {}

  ngOnInit(): void {
    this.contactService.getMessages().subscribe((messages$) => (this.messages$ = messages$), (errMess) => (this.errMess = <any>errMess));

    this.orderService.getOrdersWithConfirmedPayments().subscribe(
      (orders$) =>
        (this.chart = new Chart(document.getElementById('monthlyChart'), {
          type: 'line',
          data: {
            labels: [4, 3, 2, 1, 0].map((num) =>
              moment().subtract(num, 'month').format('MMMM')
            ),
            datasets: [
              {
                label: 'Total Sales',
                data: [4, 3, 2, 1, 0].map((num) =>
                  orders$
                    .filter((order) =>
                      moment(order.datePurchased).isSame(
                        moment().subtract(num, 'month'),
                        'month'
                      )
                    )
                    .map((order) => order.totalPrice)
                    .reduce((accumulator, current) => accumulator + current, 0)
                ),
                backgroundColor: ['transparent'],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                { ticks: { callback: (tick) => `₱ ${tick.toFixed(2)}` } },
              ],
            },
            tooltips: {
              callbacks: {
                label: (label) => `₱ ${label.yLabel.toFixed(2)}`,
              },
            },
          },
        })),
      (errMess) => (this.errMess = <any>errMess)
    );

    this.orderService.getOrdersWithConfirmedPayments().subscribe(
      (orders$) =>
        (this.chart = new Chart(document.getElementById('weeklyChart'), {
          type: 'line',
          data: {
            labels: [4, 3, 2, 1, 0].map((num) =>
              moment().subtract(num, 'week').format('MMM[.]DD')
            ),
            datasets: [
              {
                label: 'Total Sales',
                data: [4, 3, 2, 1, 0].map((num) =>
                  orders$
                    .filter((order) =>
                      moment(order.datePurchased).isSame(
                        moment().subtract(num, 'week'),
                        'week'
                      )
                    )
                    .map((order) => order.totalPrice)
                    .reduce((accumulator, current) => accumulator + current, 0)
                ),
                backgroundColor: ['transparent'],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                { ticks: { callback: (tick) => `₱ ${tick.toFixed(2)}` } },
              ],
            },
            tooltips: {
              callbacks: {
                label: (label) => `₱ ${label.yLabel.toFixed(2)}`,
              },
            },
          },
        })),
      (errMess) => (this.errMess = <any>errMess)
    );
  }
  deleteMsg(id) {
    if (window.confirm('Are you sure?')) {
    this.contactService.deleteMessage(id).subscribe((messages$) => (this.messages$ = messages$), (errMess) => (this.errMess = <any>errMess));

    this.contactService.getMessages().subscribe((messages$) => (this.messages$ = messages$), (errMess) => (this.errMess = <any>errMess));
  }
}
}
