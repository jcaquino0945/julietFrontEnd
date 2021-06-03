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
import { Contact } from '../models/contact';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

const apiUrl = '/server/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  searchQuery = '';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'bearer ' + sessionStorage.getItem('token')
 });
 postHeaders = new HttpHeaders({ 
  'Content-Type': 'application/json',
});
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }
  setSearchQuery(val) {
    this.searchQuery = val;
  }
  getSearchQuery() {
    return this.searchQuery;
  }

  getMessages(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(apiUrl, { headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteMessage(id: string): Observable<any> {
    return this.http
      .delete<Contact[]>(apiUrl + '/' + id, { headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  sendMessage(contact) {
    console.log('from service');
    //console.log(product['stock_quantity'] + 'product');
    console.log(JSON.stringify(contact));
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(contact),
    };

     fetch(apiUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    
  }
}
