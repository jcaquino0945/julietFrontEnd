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

const apiUrl = 'http://localhost:3000/cms';

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
}
