import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  stocks = [];

  constructor() { }

  addToCart(product) {
    this.items.push(product);
  }
  addStock(stock) {
    this.stocks.push(stock);
  }
  getStocks() {
    return this.stocks;
  }

  getItems() {
    return this.items
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  itemPrice() {
    let total = 0;
    for(let data of this.items){
      total += data.totalPrice;
    }
      return total;
  }
  

  totalPrice() {
    let total = 0;
    for(let data of this.items){
      total += data.totalPrice
    }
    return total;
  }
  
}
