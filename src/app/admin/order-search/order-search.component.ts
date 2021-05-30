import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Orders } from '../../models/orders';
import { size } from '../../models/sizes';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
  orders$: Orders[];
  errMess: string;
  searchForm: FormGroup;
  constructor(
    private router: Router,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let searchQuery = this.orderService.getSearchQuery();
    console.log(searchQuery);
    this.orderService.searchProduct(searchQuery).subscribe(
      (orders$) => (this.orders$ = orders$, console.log(this.orders$)),
     
      (errmess) => (this.errMess = <any>errmess)
    );

    this.searchForm = this.formBuilder.group({
      searchName: [null, Validators.required],
    })
  }
  search() {
    this.orderService.setSearchQuery(this.searchForm.get('searchName').value)
    console.log(this.orderService.getSearchQuery())
    
    let searchQuery = this.orderService.getSearchQuery();
    console.log(searchQuery);
    this.orderService.searchProduct(searchQuery).subscribe(
      (orders$) => (this.orders$ = orders$, console.log(this.orders$)),
     
      (errmess) => (this.errMess = <any>errmess)
    );
  }
}