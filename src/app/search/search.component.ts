import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  standalone: false,
  
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResult:  any[] = [];  // Prevent undefined errors

  constructor(private route:ActivatedRoute, private product: ProductService) { }

  ngOnInit() {
   let query= this.route.snapshot.paramMap.get('query');
    query && this.product.SuggestProduct(query).subscribe((data) => {
      this.searchResult = data;
    });
  }

}
