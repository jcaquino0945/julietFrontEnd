import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { CartService } from '../services/cart.service';
import { ResponsiveService } from '../services/responsive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  emptyCheckout: boolean;
  cartEmpty: boolean;
  saveSuccess: boolean;
  public isMobile: Boolean;
  items = this.cartService.getItems();
  stocks = this.cartService.getStocks();
  totalPrice = this.cartService.totalPrice();
  itemPrice = this.cartService.itemPrice();
  productStock;
  quantity: number;
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private router: Router,
    private cartService: CartService,
    private responsive: ResponsiveService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0,0);
    console.log(this.items);
    this.nav.show();
    this.ribbon.show();
    this.footer.show();
    this.onResize();
    this.responsive.checkWidth();
  }
  clearCart() {
    this.items = [];
    this.cartService.clearCart();
    this.saveSuccess = true 
  }
  clearCartEmpty() {
    this.cartEmpty = true;
  }
  checkoutCartEmpty() {
    this.emptyCheckout = true;
  }
  resetAlertBooleans() {
    this.saveSuccess = false 
    this.cartEmpty = false;
    this.emptyCheckout = false;
  }
  addQuantity(item) {
    
    item.updateStock = item.stock_quantity;
    item.quantity++;
    if (item.quantity > item.stock_quantity) {
      item.quantity = item.stock_quantity;
    }
    //item.updateStock = item.stock_quantity - item.quantity;
     this.productStock = {
      _id: item._id,
      stock_quantity:  item.stock_quantity - item.quantity,
      orders: item.orders + item.quantity
    };
    console.log(this.productStock);
    this.cartService.addStock(this.productStock)
    item.totalPrice = item.price * item.quantity;
    this.totalPrice = this.cartService.totalPrice();
    this.itemPrice = this.cartService.itemPrice();
  
  }
  deleteItem(item) {
    console.log(item)
    console.log(this.items.indexOf(item))
    this.items.splice(this.items.indexOf(item), 1); 
    this.totalPrice = this.cartService.totalPrice();
    this.itemPrice = this.cartService.itemPrice();
  }
  subtractQuantity(item) {
    item.updateStock = item.stock_quantity;
    item.quantity--;
    item.updateStock = item.stock_quantity - item.quantity;
    if (item.quantity == 0) {
      item.quantity = 1;
    }
    //item.updateStock = item.stock_quantity - item.quantity;
     this.productStock = {
      _id: item._id,
      stock_quantity:  item.stock_quantity - item.quantity,
      orders: item.orders + item.quantity
    };
    console.log(this.productStock);
    this.cartService.addStock(this.productStock)
    item.totalPrice = item.price * item.quantity;
    this.totalPrice = this.cartService.totalPrice();
    this.itemPrice = this.cartService.itemPrice();

  }
  checkout() {
    this.cartService.addStock(this.productStock);
    this.router.navigate(['/checkout'])
  }
  updatePrice(item) {
    //item.quantity = this.quantity;
    item.totalPrice = item.price * this.quantity;
    
    //console.log(item.quantity)
    //console.log(item.price);
    //console.log(item.totalPrice);

    console.log(item);
    this.totalPrice = this.cartService.totalPrice();
    this.itemPrice = this.cartService.itemPrice();
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}