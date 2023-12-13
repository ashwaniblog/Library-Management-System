import { Component , OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrarymanagementService } from '../librarymanagement.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  SigninUser = new FormGroup({
    email : new FormControl('',[Validators.required]),
    Password : new FormControl('',[Validators.required])
  })
  route = "signin"
  collection : any = [];
  constructor(private login : LibrarymanagementService , private navrouter : Router){}

  ngOnInit(): void {
    
  }
  LoginUser(){ 
    this.login.loginUser(this.SigninUser.value , this.route).subscribe((result : any)=>{
      this.collection = result;
      sessionStorage.setItem('username', JSON.stringify(this.collection));
      localStorage.setItem('token' , result.token);
      console.warn("result is here",result);  
      if(this.collection.email != null)
      {
       this.SigninUser.reset();
       this.navrouter.navigate(['/']);
       setTimeout(() => {
        window.location.reload(); 
       }, 100);
       
      }
    })
  }
  get Email() : FormControl {
    return this.SigninUser.get("email") as FormControl;
  }
  get Password() : FormControl{
    return this.SigninUser.get("Password") as FormControl;
  }
}
