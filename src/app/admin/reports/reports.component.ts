import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { Orders } from '../../models/orders';
import * as moment from 'moment';
import { OrderService } from 'src/app/services/order.service';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  ResponsiveService
} from 'src/app/services/responsive.service';


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
  public isMobile: boolean;
  constructor(
    private orderService: OrderService,
    private contactService: ContactService,
    public dialog: MatDialog,
    private responsive: ResponsiveService,
    ) {}

  ngOnInit(): void {
    this.onResize();
    this.responsive.checkWidth();

    this.contactService.getMessages().subscribe((messages$) => (this.messages$ = messages$), (errMess) => (this.errMess = <any>errMess));

    this.orderService.getOrdersWithConfirmedPayments().subscribe(
      (orders$) =>
        (this.chart = new Chart(document.getElementById('yearlyChart'), {
          type: 'line',
          data: {
            labels: [4, 3, 2, 1, 0].map((num) =>
              moment().subtract(num, 'year').format('YYYY')
            ),
            datasets: [
              {
                label: 'Total Sales',
                data: [4, 3, 2, 1, 0].map((num) =>
                  orders$
                    .filter((order) =>
                      moment(order.datePurchased).isSame(
                        moment().subtract(num, 'year'),
                        'year'
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

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
  
  deleteMsg(id) {
    if (window.confirm('Are you sure?')) {
    this.contactService.deleteMessage(id).subscribe((messages$) => (this.messages$ = messages$), (errMess) => (this.errMess = <any>errMess));

    this.contactService.getMessages().subscribe((messages$) => (this.messages$ = messages$), (errMess) => (this.errMess = <any>errMess));
  }
}
sortProductByPrice(option) {
  if (option.value == "l2h") {
    this.messages$.sort((a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime());
  } else if (option.value == "h2l") {
    this.messages$.sort((a, b) => new Date(a.dateSent).getTime() - new Date(b.dateSent).getTime());
  } else if (option.value == "a2z") {
    this.messages$.sort(function (a, b) {
      return ('' + a.name).localeCompare(b.name); 
    })
  } else if (option.value == "z2a"){
    this.messages$.sort(function (a, b) {
      return ('' + b.name).localeCompare(a.name); 
    })
  }
}

openDialog(name,email,message) {
  this.dialog.open(DialogDataExampleDialog, {
    data: {
      name, email, message
    }
  });
}
}

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
  <h1 mat-dialog-title>Reply to user</h1>
<div mat-dialog-content>
  Message details:
  <ul>
    <li>
     From: {{data.name}}
    </li>
    <li>
      Message: {{data.message}}
    </li>
  </ul>
  <form novalidate #replyForm="ngForm" (ngSubmit)="replyToUser()">
      <input
      placeholder="Input reply here"
      type="text"
      [(ngModel)]="replyData.reply"
      name="reply"
      class="form-control"
      #reply="ngModel"
      required
      />
      <br>
      <button
            style="border: .5px solid white; padding: 3px 8px; color: white; background-color: #6e815d; margin-right: 6px"
            type="submit"
            [disabled]="replyForm.form.invalid"
          >
            Reply
          </button> 
          <span *ngIf="replyForm.form.invalid" style="color:white">Reply is required</span>
  </form>
</div>
  `,
})

export class DialogDataExampleDialog {
  replyData = { reply: ''};
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private orderService: OrderService,
  ) {}

  replyToUser() {
    let emailDetail = {
      to: this.data.email,
      subject: `Admin reply to query by: ${this.data.name}`,
      html: `
      <h5>Subject: ${this.data.message}</h5>
      <p>Admin has replied: <span style="font-weight:bold;">${this.replyData.reply}
      `
    }
    this.orderService.sendReceipt(emailDetail)
    window.alert(`Message has been sent to ${this.data.email}`)
  }
}