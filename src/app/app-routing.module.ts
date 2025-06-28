import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAuthGuard } from './seller-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserComponent } from './user/user.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {
  path: '',
  component:HomeComponent
},
{
  path: 'seller',
  component:SellerComponent
},
{
  path: 'seller-home',
  component:SellerHomeComponent,
  canActivate: [SellerAuthGuard]
},
{
path:'seller-add-product',
component:SellerAddProductComponent,
canActivate:[SellerAuthGuard]
},
{
  path:'seller-update-product/:id',
component:SellerUpdateProductComponent,
canActivate:[SellerAuthGuard]
},
{
  path:'search/:query',
  component: SearchComponent
},
{
  path:'product-details/:id',
  component: ProductDetailsComponent
},
{
  path:'user',
 component:UserComponent
},
{
  path:'cart-page',
  component:CartPageComponent
},
{
  path:'checkout',
  component:CheckoutComponent
},
{
  path:'my-orders',
  component:MyOrderComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
