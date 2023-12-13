import { OnInit,OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarymanagementService } from '../librarymanagement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  private apiCallInterval: any;
  private apiCallDelay = 500;
  constructor(private route : Router, private service : LibrarymanagementService ) {

    this.isLoggedIn= sessionStorage.getItem('username')!=null;
    console.log("login",this.isLoggedIn);
    
    const username = sessionStorage.getItem('username');
    if (username) {
      const userData = JSON.parse(username);
      this.email = userData.email;
      // this.tokens = userData.tokens;
    }
  }
  id : any
  isLoggedIn: any;
  email : any;
  tokens : any;

  fecthUserid()
  {
    if (this.email)
    {
      console.log(this.email,"my email val is");
    this.service.fetchUserid(this.email).subscribe((result : any)=>{
      sessionStorage.setItem('loggedinUserId', JSON.stringify(result.id));
      this.id = result.id;
      console.warn("fetchedId",result);
    })
   }
  }
  ngOnInit(): void {
    if (this.email)
    {
      console.log(this.email,"calling observable");
      this.startApiCalls();
    }
    // if (this.email) {
    //   setTimeout(() => {
    //     this.service.fetchtokens(this.email).subscribe((result: any) => {
    //       this.tokens = result;
    //       console.warn("fetchetokens", result);
    //     })
    //   }, 100); 
    // }
  }

  ngOnDestroy(): void {
    this.stopApiCalls();
  }

  

  logout() {
    this.service.logoutuser().subscribe((result : any)=>{
      console.log("logout",result);
    })
    sessionStorage.clear();
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    console.log(this.isLoggedIn);
  }

  private startApiCalls(): void {
    this.apiCallInterval = setInterval(() => {
      this.service.getData(this.email).subscribe(
        (data) => {
          console.log('API Response:', data);
          this.tokens = data;
        }
      );
    }, this.apiCallDelay);
  }

  private stopApiCalls(): void {
    clearInterval(this.apiCallInterval);
  }

}
