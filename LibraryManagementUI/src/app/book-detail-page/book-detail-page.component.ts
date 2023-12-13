import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { LibrarymanagementService } from '../librarymanagement.service';

@Component({
  selector: 'app-book-detail-page',
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.css']
})
export class BookDetailPageComponent implements OnInit{
  email: any;
  borrowerid: any;
  route = "getCars";
  bookCollection: any[]=[];
  formError: string | null = null;
  tokens : any;

  constructor(private service: LibrarymanagementService, private router: ActivatedRoute , private rentrouter : Router) {
    
    const userdata = sessionStorage.getItem('username');
    if (userdata) {
      const userData = JSON.parse(userdata);
      this.email = userData.email;
    }
    console.log(userdata);
    console.log(this.email);

  }

  ngOnInit(): void {
    this.service.fetchtokens(this.email).subscribe((result:any)=>{
      console.warn("my tokens count",result);
      this.tokens=result;
    })
    const id = this.router.snapshot.params['id'];
    console.log("my id is",id);
    this.service.getsinglebooks(id).subscribe((result:any)=>{
      console.warn("my result",result);
      this.bookCollection.push(result)
      console.log(this.bookCollection); 
    })
  }

  carForm = new FormGroup({
    RentalStartDate: new FormControl('', [Validators.required]),
    RentalEndDate: new FormControl('', [Validators.required]),
    CarId: new FormControl(),
    UserEmail: new FormControl(),
  });

  sendData(lentUser_id : any) {
    if (this.tokens > 0) {
      const userData = JSON.parse(sessionStorage.getItem('username'))
      this.borrowerid = (userData.id)
      console.log(this.borrowerid);
      console.log(JSON.parse(lentUser_id));


      const requestBody = {
        lent_By_User_id: JSON.parse(lentUser_id),
        currently_Borrowed_By_User_Id: this.borrowerid,
        id: this.router.snapshot.params['id']
      }
      console.log("my body", requestBody);

      setTimeout(() => {
        this.service.borrow(requestBody).subscribe((result: any) => {

          console.warn("add cart result", result)
          // this.rentrouter.navigate(['/']);      
        })

      }, 300);

      const requestBodyborrow = {
        lent_By_User_id: JSON.parse(lentUser_id),
        currently_Borrowed_By_User_Id: JSON.stringify(this.borrowerid),
        id: this.router.snapshot.params['id']
      }
      console.log(requestBodyborrow.currently_Borrowed_By_User_Id, "borrow");


      setTimeout(() => {
        this.service.bookborrowupdate(requestBodyborrow).subscribe((result: any) => {

          console.warn("add cart result", result)
          this.rentrouter.navigate(['/']);
        })
      }, 500);
    }
    else {
      alert("Didn't have enough tokens");
    }
  }
}
