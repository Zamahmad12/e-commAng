import { Component, OnInit } from '@angular/core';
import { SellerService } from '../Services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller',
  standalone: false,
  
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent implements OnInit {
  constructor(private seller:SellerService, private router:Router) {}
showLogin:boolean=false;
loginerorr:string='';
  ngOnInit(): void {
    this.seller.reloadseller();
  }
    SignUp(data :SignUp):void{
      console.log(data);
      this.seller.sellerSignUp(data)
}
Login(data:Login):void{
  // console.log(data);
  this.loginerorr='';
  this.seller.sellerLogin(data)
  this.seller.isloginerror.subscribe((error)=>{
    if(error){
      this.loginerorr="Invalid Email or Password";
    }
  })
}
OpenLogin():void{
 this.showLogin=true;
}
OpenSignUp():void{
  this.showLogin=false;
}
}
