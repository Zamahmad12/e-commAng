import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedIn = new BehaviorSubject<boolean>(false);
isloginerror = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router:Router) { }
  sellerSignUp(data:SignUp){
    this.http.post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      console.log(result);
    })

    return false
  }
  reloadseller(){
    let seller = localStorage.getItem('seller');
    if(seller){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
    sellerLogin(data:Login){
    this.http.get(`http://localhost:3000/seller?Email=${data.Email}&Password=${data.Password}`,{observe:'response'})
    .subscribe((result:any)=>{
      console.log(result);
      if(result && result.body && result.body.length){
       console.log("Login Success");
       localStorage.setItem('seller',JSON.stringify(result.body));
       this.router.navigate(['seller-home']);
      }else{
        console.log("Login Failed")
        this.isloginerror.emit(true);
      }
    })

    // return false
  }
}
