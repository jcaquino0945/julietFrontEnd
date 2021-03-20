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
import { CMS } from '../models/cms';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

const apiUrl = 'http://localhost:3000/ribbon';

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer ' + sessionStorage.getItem('token'),
  });
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getRibbons(): Observable<CMS[]> {
    return this.http
      .get<CMS[]>(apiUrl)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  updateRibbon(id,data): Observable<CMS[]> {
    return this.http
      .put<CMS[]>(apiUrl + '/' + id,data,{headers: this.headers})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
