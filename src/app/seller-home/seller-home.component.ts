import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  standalone: false,
  
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit{
  productlist: undefined|Product[];
  DeleteMessage: string = '';
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.productlist().subscribe((res)=>{ 
     if(res){
      this.productlist = res ;
     }
  })
}
DeleteProd(id: number){  
  this.product.deleteProduct(id).subscribe((res)=>{
    if(res){
      this.productlist = this.productlist?.filter((product)=>product.id !== id);
      this.DeleteMessage = 'Product Deleted Successfully';
    }
    setTimeout(() => {
      this.DeleteMessage = '';
    }, 3000);
  })
}
}
