import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { RibbonComponent } from './ribbon/ribbon.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { FacebookModule } from 'ngx-facebook';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { JewelryCareComponent } from './jewelry-care/jewelry-care.component';
import { ShopByCategoryComponent } from './shop-by-category/shop-by-category.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordDetailsComponent } from './forgot-password-details/forgot-password-details.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ShopBestsellersComponent } from './shop-bestsellers/shop-bestsellers.component';
import { ShopRecentlyAddedComponent } from './shop-recently-added/shop-recently-added.component';
import {MatIconModule} from '@angular/material/icon';

//import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PagenotfoundComponent,
    LoginComponent,
    AdminComponent,
    FooterComponent,
    RibbonComponent,
    AboutUsComponent,
    ShopComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    ContactUsComponent,
    FaqsComponent,
    JewelryCareComponent,
    ShopByCategoryComponent,
    ForgotPasswordComponent,
    ForgotPasswordDetailsComponent,
    ThankYouComponent,
    ShopBestsellersComponent,
    ShopRecentlyAddedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FacebookModule.forRoot(),
    CarouselModule,
    ButtonModule,
    ToastModule,
    MatIconModule
    //AdminModule
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
