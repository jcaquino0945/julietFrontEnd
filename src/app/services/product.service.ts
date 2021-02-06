import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

const apiUrl = 'http://localhost:3000/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl).pipe(catchError(this.processHTTPMsgService.handleError))
  }

  addGallery(product: Product, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    //formData.append('imageTitle', gallery.imageTitle);
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('description', product.description);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', apiUrl, formData, options);
    return this.http.request(req);
  }
}
