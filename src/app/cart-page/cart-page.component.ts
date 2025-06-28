import { Component, OnInit } from '@angular/core';
import { Cart, Order, Product } from '../data-type';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
cartData: Cart[] |undefined;
Order:Order={
  price:0,
  discount:0,
  tax:0,
  delivery:0,
  total:0
};
  constructor(private product:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.LoadDetaials();
  }
  Checkout(){
    this.router.navigate(['/checkout']);
  }
  LoadDetaials(){
    this.product.CartDataUpdate().subscribe((data)=>{
      this.cartData = data;
      let price = 0;
      data.forEach((items) => {
        if(items.quantity){
        price = price + (+items.Price* items.quantity);
        }
    })
    this.Order.price = Math.floor(price);
    this.Order.tax = Math.floor(price * 0.18);
    this.Order.delivery = Math.floor(50);
    this.Order.discount =Math.floor( price * 0.1);
    this.Order.total = Math.floor(this.Order.price + this.Order.tax + this.Order.delivery - this.Order.discount);
    if(this.cartData.length == 0){
      this.router.navigate(['/']);
    }
    
  })
  }
RemoveToCart(cartId:number|undefined){
  if (cartId) {
    this.product.RemoveCartItemsDB(cartId)
      .subscribe((data) => {
       this.LoadDetaials();
      });
  }
}
}
