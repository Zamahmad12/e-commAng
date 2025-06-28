import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: false,
  
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit{
  addproductmessage: string | undefined;
  constructor(private product: ProductService,private router:Router) { } 
  ngOnInit(): void {
  }
  AddProd(data :Product){
    this.product.addProduct(data).subscribe((res)=>{
      if(res){
        this.addproductmessage = "Product Added Successfully"
      }
      setTimeout(() => {
        this.router.navigate(['/seller-home'])
        this.addproductmessage = '';  
      }, 3000);
    })
  }
  

}

