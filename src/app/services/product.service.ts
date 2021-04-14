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
import { Product } from '../models/product';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

const apiUrl = 'http://localhost:3000/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  searchQuery = '';
  currentIndex: BehaviorSubject<string>;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'bearer ' + sessionStorage.getItem('token')
 });
 stockHeaders = new HttpHeaders({ 
  'Content-Type': 'application/json',
});
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  setSearchQuery(val) {
    this.searchQuery = val;
  }
  getSearchQuery() {
    return this.searchQuery;
  }
  //get products from db
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(apiUrl)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //get featured products from db
  getFeaturedProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(apiUrl + '/featured')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getBestSellers(): Observable<Product[]> {
    return this.http
      .get<Product[]>(apiUrl + '/best-sellers')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getLowStocks(): Observable<Product[]> {
    return this.http
      .get<Product[]>(apiUrl + '/low-stock')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(apiUrl + '/category/' + category)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //get single product via id from db
  getProduct(id: string): Observable<Product> {
    return this.http
      .get<Product>(apiUrl + '/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  searchProduct(text): Observable<Product[]> {
    return this.http
      .get<Product[]>(apiUrl + '/search/' + text)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //get all product idss
  getProductIds(): Observable<number[] | any> {
    return this.getProducts()
      .pipe(map((products) => products.map((product) => product._id)))
      .pipe(catchError((error) => error));
  }

  //add product with image
  addGallery(product: Product, file: File, sizes: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('imageTitle', gallery.imageTitle);
    // formData.append('sizes', JSON.stringify(sizes));
    for (var i = 0; i < sizes.length; i++) {
      formData.append('sizes', sizes[i]);
    }
    formData.append('orders', product.orders.toString());
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('stock_quantity', JSON.stringify(product.stock_quantity));
    formData.append('featured', JSON.stringify(product.featured));
    //const header = new HttpHeaders();
    const params = new HttpParams();
    const header = new HttpHeaders({
      Authorization: 'bearer ' + sessionStorage.getItem('token'),
    });
    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    const req = new HttpRequest('POST', apiUrl, formData, options);
    return this.http.request(req);
  }

  // addGallery(product, file: File) {
  //   let productDetail = {
  //     file: file,
  //     product: product
  //   }

  //   console.log(productDetail);
  //   console.log(JSON.stringify(productDetail));
  //   var myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');

  //   var requestOptions: RequestInit = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: JSON.stringify(productDetail)
  //   };

  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log('error', error));
  // }

  //update product
  updateProduct(id, data): Observable<any> {
    console.log(this.headers);
    return this.http
      .put(apiUrl + '/' + id, data, { headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  modifyStock(id, data): Observable<any> {
    return this.http
    .put(apiUrl + '/updateStock/' + id, data, { headers: this.stockHeaders })
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  /*
  updateProduct(id, product: Product, file: File): Observable<any> {
    const formData = new FormData();
    formData.set('file', file);
    //formData.append('imageTitle', gallery.imageTitle);
    formData.set('name', product.name);
    formData.set('price', product.price.toString());
    formData.set('category', product.category);
    formData.set('description', product.description);
    formData.set('stock_quantity', product.stock_quantity.toString());
    formData.set('featured', JSON.stringify(product.featured));
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('PUT', apiUrl + '/' + id, formData, options);
    return this.http.request(req);
  }
  /*updateProduct(id,data): Observable<any> {
    return this.http.put(apiUrl + '/' + id, data).pipe(catchError(this.processHTTPMsgService.handleError));
  }*/
  deleteProduct(id: string): Observable<any> {
    return this.http
      .delete<Product[]>(apiUrl + '/' + id, { headers: this.headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
