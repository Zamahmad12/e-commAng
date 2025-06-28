import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Cart, OrderData } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,
  
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
TotalPrice:number|undefined;
cartData:Cart[]|undefined
orderMsg:string|undefined;
  constructor(private product:ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.CartDataUpdate().subscribe((data)=>{
      let price = 0;
      this.cartData=data
      data.forEach((items) => {
        if(items.quantity){
        price = price + (+items.Price* items.quantity);
        }
    })
    this.TotalPrice=Math.round(price+(price*0.18)+50-(price*0.1));
    console.log(this.TotalPrice);
    
    
  })
  }
  OrderNow(data:{email:string,contact:string,address:string}){
    let user = localStorage.getItem('user');
    let userId=JSON.parse(user||'').id;
    if(this.TotalPrice){
      let OrderData:OrderData={
        ...data,
        total:this.TotalPrice,
        userId:userId,
        id:undefined,
        image:this.cartData?.[0].ImageUrl,
        productId:this.cartData?.[0].productId,
        Name:this.cartData?.[0].Name
      }
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
         item.id && this.product.deleteCartItems(item.id)
        }, 500);
      })
      this.product.OrderNow(OrderData).subscribe((result)=>{
        if(result){
         this.orderMsg="Your Order has been Placed"
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg=undefined
          },4000);
        }
      })
    }
    
  }

}
