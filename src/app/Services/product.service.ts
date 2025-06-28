import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, OrderData, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
CartData = new EventEmitter<Product[] | []>();
  constructor(private http:HttpClient) { } 
  addProduct(data:Product){
    return this.http.post('http://localhost:3000/product',data)
  }
  productlist(){
    return this.http.get<Product[]>('http://localhost:3000/product')
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/product/${id}`)
  }
  GetProduct(id:string){
    return this.http.get<Product>(`http://localhost:3000/product/${id}`)
  }
  UpdateProduct(data:Product){
    return this.http.put<Product>(`http://localhost:3000/product/${data.id}`,data)
  }
  PopularProducts(){
    return this.http.get<Product[]>('http://localhost:3000/product?_limit=4')
  }
  TrendingProducts(){
    return this.http.get<Product[]>('http://localhost:3000/product?_limit=16')
  }
  SuggestProduct(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/product?q=${query}`)
  }
  localAddToCart(data:Product){
    let CartData=[];
    let LocalCart = localStorage.getItem('cart');
    if(!LocalCart){
      localStorage.setItem('cart',JSON.stringify([data]))
      this.CartData.emit([data])
    }else{
      CartData = JSON.parse(LocalCart);
      CartData.push(data)
      localStorage.setItem('cart',JSON.stringify(CartData))
    }
    this.CartData.emit(CartData)

  }
  RemoveItemToCart(productId : number){
    let CartData = localStorage.getItem('cart');
    if(CartData){
     let items:Product[] = JSON.parse(CartData);
     items = items.filter((item:Product)=>productId!==item.id)
     localStorage.setItem('cart',JSON.stringify(items))
     this.CartData.emit(items)
    }
   }
   AddToCart(Cartdata:Cart){
    return this.http.post('http://localhost:3000/cart',Cartdata)
   } 
    GetCartItems(userId:number){
      return this.http.get<Product[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'})
      .subscribe((data)=>{
        if(data &&data.body){
        this.CartData.emit(data.body)
      }
      })
    }
    RemoveCartItemsDB(id:number){
      return this.http.delete('http://localhost:3000/cart/'+id)
    }
    CartDataUpdate(){
      let userStore=localStorage.getItem('user')
      let userData =userStore&&JSON.parse(userStore)[0]
      return this.http.get<Cart[]>('http://localhost:3000/cart?userId='+userData.id)
    }
    OrderNow(data:OrderData){
      return this.http.post("http://localhost:3000/orders",data)
    }
    orderList(){
      let userStore=localStorage.getItem('user')
      let userData =userStore&&JSON.parse(userStore)[0]
      return this.http.get<OrderData[]>("http://localhost:3000/orders?userId="+userData.id)
    }
    deleteCartItems(id: number){
      return this.http.delete('http://localhost:3000/cart/'+ id,{observe:"response"})
      .subscribe((data)=>{
        this.CartData.emit([])
      })
    }
    CancelOrder(OrderId:number){
      return this.http.delete('http://localhost:3000/orders/'+OrderId)
    }
}
