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
import { cmsAbout } from '../models/cms-about';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

const apiUrl = '/ribbon';
const cmsAboutUrl = '/cms-about';

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
  getAboutUsDetails(): Observable<cmsAbout[]> {
    return this.http
    .get<cmsAbout[]>(cmsAboutUrl)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getProductIds(): Observable<cmsAbout[] | any> {
    return this.getAboutUsDetails()
      .pipe(map((contact) => contact.map((contact) => contact._id)))
      .pipe(catchError((error) => error));
  }
  updateAboutUsDetail(id,data): Observable<cmsAbout[]> {
    return this.http
      .put<cmsAbout[]>(cmsAboutUrl + '/' + id,data,{headers: this.headers})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
