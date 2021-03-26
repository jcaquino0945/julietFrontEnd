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
    };
    console.log(this.productStock);
    item.totalPrice = item.price * item.quantity;
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
    };
    console.log(this.productStock);
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
