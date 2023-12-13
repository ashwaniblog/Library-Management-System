import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarymanagementService } from '../librarymanagement.service';

@Component({
  selector: 'app-lented-books',
  templateUrl: './lented-books.component.html',
  styleUrls: ['./lented-books.component.css']
})
export class LentedBooksComponent implements OnInit{
  email : any;
  Userid : any;
  bookCollection : any[]=[];
  route = "getproduct";

  constructor(private service : LibrarymanagementService , private router : Router){
    const userdata = sessionStorage.getItem('username');
    if (userdata) {
      const userData = JSON.parse(userdata);
      this.email = userData.email;
      this.Userid = JSON.stringify(userData.id)
    }
    // console.log(userdata);
    console.log(this.email);
    console.warn(this.Userid);
  }

  ngOnInit(): void {
    this.service.getallbooks(this.route).subscribe((result:any)=>{
      console.warn("this is the result",result);
      result.forEach((object : any) => {
        console.log(this.Userid);
        if (object.lent_By_User_id == this.Userid)
        {
          this.bookCollection.push(object);
        }
      });
    })
  }

}
