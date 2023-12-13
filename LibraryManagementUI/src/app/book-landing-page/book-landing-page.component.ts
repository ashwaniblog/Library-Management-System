import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarymanagementService } from '../librarymanagement.service';

@Component({
  selector: 'app-book-landing-page',
  templateUrl: './book-landing-page.component.html',
  styleUrls: ['./book-landing-page.component.css']
})
export class BookLandingPageComponent implements OnInit{
  bookCollection: any[] = [];
  filteredBookCollection: any[] = [];
  route = "getproduct";
  email: any;
  Userid : any;
  searchText: string = '';
  availibility_status:any; 
  
  @ViewChild('searchInput') searchInput!: ElementRef;

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
      this.bookCollection = result;
      this.filterCars();
    })

  }
  filterCars() {
    console.log(this.searchInput.nativeElement.value);
    
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    if (searchTerm.trim() === '') {
      this.filteredBookCollection = [...this.bookCollection];
    } else {
      this.filteredBookCollection = this.bookCollection.filter((book) =>
        book.name.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
      );
    }
    console.warn(this.filteredBookCollection,"filtered")
  }

  availablebook(id : any){
    console.log("all books are",this.bookCollection);
    console.log("my book id req",id);
    this.bookCollection.forEach((object : any) => {
      if (object.id == id)
      {
        this.availibility_status = object.is_Book_Available
      }
    });
    console.log("status",this.availibility_status);
    const requestBody = {
      id: id,
      name: 'spider-man',
      rating: 5,
      author: 'stan-lee',
      genre: 'sci-fi',
      is_Book_Available: this.availibility_status,
      description: 'good',
      lent_By_User_id: this.Userid,
      currently_Borrowed_By_User_Id: '0',
    }
    console.log(requestBody.lent_By_User_id);
    this.service.isavailable(requestBody).subscribe((result: any) => {
       if(result == true)
       {
        this.router.navigate([`viewdetails/${id}`]);
       }
       else {
         alert("This book is not available");
       }
    })
  }
  
}
