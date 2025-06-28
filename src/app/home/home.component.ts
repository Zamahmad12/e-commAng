import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProducts: undefined|Product[];
  trendingProducts: undefined|Product[];
  constructor(private product: ProductService){}
  ngOnInit(): void {
    this.product.PopularProducts().subscribe(data=>{
      this.popularProducts = data
    })
    this.product.TrendingProducts().subscribe(data=>{
      this.trendingProducts = data
    })
  }
 

}
