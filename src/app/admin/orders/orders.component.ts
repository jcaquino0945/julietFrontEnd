import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from '../../models/orders';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { OrderService } from '../../services/order.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';

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
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders$: Orders[];
  errMess: string;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders$) => (this.orders$ = orders$), (errMess) => (this.errMess = <any>errMess))

    this.searchForm = this.formBuilder.group({
      searchName: [null, Validators.required],
    })

  }
  search() {
    this.orderService.setSearchQuery(this.searchForm.get('searchName').value)
    console.log(this.orderService.getSearchQuery())
    this.router.navigate(['admin/orders/search'])
  }
}
