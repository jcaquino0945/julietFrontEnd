import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ModuleWithProviders } from '@angular/core';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { JewelryCareComponent } from './jewelry-care/jewelry-care.component';
import { ShopByCategoryComponent } from './shop-by-category/shop-by-category.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordDetailsComponent } from './forgot-password-details/forgot-password-details.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ShopBestsellersComponent } from './shop-bestsellers/shop-bestsellers.component';
import { ShopRecentlyAddedComponent } from './shop-recently-added/shop-recently-added.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/best-sellers', component: ShopBestsellersComponent },
  { path: 'shop/recently-added', component: ShopRecentlyAddedComponent },
  { path: 'shop/category/:category', component: ShopByCategoryComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'forgotPassword/:_id', component: ForgotPasswordDetailsComponent },

  { path: 'admin', component: AdminComponent, 
  canActivate : [AuthGuard],
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'admin', component: AdminComponent, canActivate : [AuthGuard] },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'jewelry-care', component: JewelryCareComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `Home`
  { path: '**', component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

