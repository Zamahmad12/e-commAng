import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
isloginerror = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(user:SignUp){
    this.http.post('http://localhost:3000/user',user, {observe:"response"}).subscribe((data)=>{
      if(data){
        localStorage.setItem('user',JSON.stringify(data.body))
        this.router.navigate(['/'])
      }
    })
  }
  userLogin(data:Login){
    this.http.get(`http://localhost:3000/user?Email=${data.Email}&&Password=${data.Password}`,{observe:'response'})
    .subscribe((result)=>{
      if(result && result.body && (result.body as any[]).length){
        console.log("Login Success");
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
       }else{
         console.log("Login Failed")
         this.isloginerror.emit(true);
       }
    })
  }
  reloadUser(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
