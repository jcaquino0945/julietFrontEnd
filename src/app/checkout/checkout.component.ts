import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  title = 'stepper';
  private stepper: Stepper;

  previous() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit(): void { 
    this.stepper = new Stepper(document.querySelector('#stepper'), {
      linear: false,
      animation: true
    })    
  }

}
