import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { OrderData } from '../data-type';

@Component({
  selector: 'app-my-order',
  standalone: false,
  
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit{
  orderdata:OrderData[]|undefined
  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.getOrderList();
}
CancelOrder(OrderId:number){
  this.product.CancelOrder(OrderId).subscribe((data)=>{
    this.getOrderList();
  })
}
getOrderList(){
  this.product.orderList().subscribe((data)=>{
    this.orderdata=data
  })
}

}
