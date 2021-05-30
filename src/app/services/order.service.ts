import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Orders } from '../models/orders';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

const apiUrl = '/server/api/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  searchQuery = '';
  currentIndex: BehaviorSubject<string>;
  headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'bearer ' + sessionStorage.getItem('token')
 });

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  setSearchQuery(val) {
    this.searchQuery = val
  }
  getSearchQuery() {
    return this.searchQuery
  }
  searchProduct(text): Observable<Orders[]> {
    return this.http
    .get<Orders[]>(apiUrl + '/search/' + text,{ headers: this.headers })
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getOrders(): Observable<Orders[]> {
    return this.http
      .get<Orders[]>(apiUrl,{ headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getOrdersWithConfirmedPayments(): Observable<Orders[]> {
    return this.http
      .get<Orders[]>(apiUrl + '/confirmedPayments',{ headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getOrdersWithAwaitingPayments(): Observable<Orders[]> {
    return this.http
      .get<Orders[]>(apiUrl + '/awaitingPayments',{ headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  deleteOrder(id: string): Observable<any> {
    return this.http
      .delete<Orders[]>(apiUrl + '/' + id, { headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
/*
  getEvents(): Observable<Orders[]> {    
    return this.http.get<Orders[]>(apiUrl,{ headers: this.headers }).pipe(
        map(orders => orders.sort((a, b) => new Date(b.datePurchased).getTime() - new Date(a.datePurchased).getTime()))
    ) ;
  }
  */
  getOrder(id: string): Observable<Orders> {
    return this.http
      .get<Orders>(apiUrl + '/' + id,{ headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getOrderIds(): Observable<number[] | any> {
    return this.getOrders()
      .pipe(map((orders) => orders.map((order) => order._id)))
      .pipe(catchError((error) => error));
  }


  addOrder(product) {
    console.log('from service');
    //console.log(product['stock_quantity'] + 'product');
    console.log(JSON.stringify(product));
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(product),
    };

     fetch(apiUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    
  }

  sendReceipt(emailDetail) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    /*var raw = JSON.stringify({"to":"jcaquino0945@gmail.com","subject":"test from body","html":"<h1>A TEST MSG</h1>"});*/

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(emailDetail),
    };

    fetch('/server/api/smtp', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
  //update order
  updateOrder(id, data): Observable<any> {   
    console.log(this.headers);
    return this.http
      .put(apiUrl + '/' + id, data, { headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
