import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Orders } from '../models/orders';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


const apiUrl = 'http://localhost:3000/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(apiUrl).pipe(catchError(this.processHTTPMsgService.handleError))
  }

  addOrder(product) {    
    console.log("from service");
    console.log(product)
    console.log(JSON.stringify(product))
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(product),
    };
    
      fetch(apiUrl, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  sendReceipt(emailDetail) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

    /*var raw = JSON.stringify({"to":"jcaquino0945@gmail.com","subject":"test from body","html":"<h1>A TEST MSG</h1>"});*/

      var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(emailDetail),
    };
    
      fetch("http://localhost:3000/smtp", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}
