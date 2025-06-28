import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  Manu:string="default"
  sellerName:string='';
  userName:string=';'
  suggestResult:undefined| Product[];
  CartItems = 0;
  constructor(private router:Router, private product: ProductService) {}

ngOnInit(): void {
    this.router.events.subscribe((event:any)=>{
      if(event.url){
       if(localStorage.getItem('seller') && event.url.includes('seller')){
        let  sellerstore =localStorage.getItem('seller');
        let sellerdata= sellerstore&&JSON.parse(sellerstore)[0];
        this.sellerName=sellerdata.Name;
        this.Manu='seller'
        }else if (localStorage.getItem('user')) {
          let userStore=localStorage.getItem('user')
          let userData =userStore&&JSON.parse(userStore)[0]
          this.userName=userData.Name
          this.Manu='user'
          this.product.GetCartItems(userData.id)
        }
      else{
        this.Manu="default";
      }
    }
})  
let LocalCart = localStorage.getItem('cart');
if(LocalCart){
  this.CartItems = JSON.parse(LocalCart).length;
  this.product.CartData.subscribe((data)=>{
    this.CartItems = data.length;
  })
}
}
SellerLogout():void{
  localStorage.removeItem('seller');
  this.router.navigate(['/']);
}
UserLogout():void{
  localStorage.removeItem('user')
  this.router.navigate(['/user'])
  this.product.CartData.emit([])
}
searchproduct(query:KeyboardEvent){
  if(query){
    let search=query.target as HTMLInputElement;
    this.product.SuggestProduct(search.value).subscribe((data)=>{
      if(data.length>5){
        data.length=5
      }
      this.suggestResult=data;
    })
  }
}
hiddenSearch(){  
  this.suggestResult=undefined;
}
RedirecToDetails(id:number){
  this.router.navigate([`/product-details/`+id]);
}
submitSearch(val:string){
  this.router.navigate([`search/${val}`]);
}
}
