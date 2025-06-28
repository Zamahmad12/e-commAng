import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { UserService } from '../Services/user.service';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  showLogin:boolean=false
  loginerorr:string='';
  constructor(private User:UserService ,private product:ProductService){}
  ngOnInit(): void {
    this.User.reloadUser()
  }
  SignUp(data:SignUp){
    this.User.userSignUp(data)
  }
  Login(data:Login){
    this.User.userLogin(data)
   
    this.User.isloginerror.subscribe((error)=>{
      if(error){
        this.loginerorr="Invalid Email or Password"
      }else{
        this.LocalcartToDB()
      }
    })
    setTimeout(() => {
      this.loginerorr='';
    }, 3000);
  }
  OpenLogin():void{
    this.showLogin=true
  }
  OpenSignUp():void{
    this.showLogin=false
  }
  LocalcartToDB(){
    let data= localStorage.getItem('cart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if(data){
      let items:Product[] = JSON.parse(data);
      items.forEach((product:Product,index:number)=>{
        let cartData:Cart={
          ...product,
          productId:product.id,
          userId,
        }
        delete cartData.id;
       setTimeout(() => {
        this.product.AddToCart(cartData).subscribe((data)=>{
          console.log(data)
        })
      },500);
      if(items.length===index+1){
        localStorage.removeItem('cart');
      }
      })
    }
    setTimeout(() => {
      this.product.GetCartItems(userId)
    }, 2000);
  }

}
