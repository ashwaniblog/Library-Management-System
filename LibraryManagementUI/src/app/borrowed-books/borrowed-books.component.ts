import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarymanagementService } from '../librarymanagement.service';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit{
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
        console.log(object);
        if (object.currently_Borrowed_By_User_Id == this.Userid)
        {
          this.bookCollection.push(object);
        }
      });
    })
  }
}
