import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: false,
  
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit{
  productData: undefined| Product
  updatemessage: undefined| string;
  constructor(private route: ActivatedRoute, private product:ProductService,private Router:Router){}
  ngOnInit():void{
    let productId = this.route.snapshot.paramMap.get(`id`);
    console.log(productId);
    productId && this.product.GetProduct(productId).subscribe((result) => {
      this.productData=(result)
      console.log(this.productData);
    });
  }
EditProd(data:Product){
  if(this.productData){
    data.id = this.productData.id;
  }
  this.product.UpdateProduct(data).subscribe((result) => {
    console.log(result); 
    if(result){
      this.updatemessage = 'Product Updated Successfully'
    } 
})
setTimeout(() => {
  this.updatemessage = undefined;
  this.Router.navigate(['/seller-home'])
}, 3000);
}
}