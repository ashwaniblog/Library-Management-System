import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LibrarymanagementService } from '../librarymanagement.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{

  fetchedUserId : any

  addCars = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Rating: new FormControl('', [Validators.required, Validators.pattern('^[0-5]{1}$')]),
    Author: new FormControl('', [Validators.required]),
    Genre: new FormControl('', [Validators.required]),
    is_Book_Available: new FormControl(true),
    Description: new FormControl('', [Validators.required]),
    lent_By_User_id: new FormControl(''),
    currently_Borrowed_By_User_Id: new FormControl('0')
  });
  
  collection: any = []
  route = "addproduct"
  constructor(private service: LibrarymanagementService , private router : Router) { }

  Submit() {
    this.fetchedUserId = sessionStorage.getItem('loggedinUserId')
     if (this.addCars.valid) {
      console.log(this.fetchedUserId,"my val");
      this.addCars.value.lent_By_User_id = this.fetchedUserId
      console.log(this.addCars.value.lent_By_User_id);
      this.service.addCars(this.addCars.value, this.route).subscribe((result) => {
        console.log("Result of Cars", result)
        this.collection = result
        console.warn("Collection", this.collection);
        this.addCars.reset();
        this.router.navigate(['/']);
      })
    }
    else {
      console.log('Form validation errors');
      this.addCars.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    // this.addCars.get('lent_By_User_id').disable();
  }

  get Name(): FormControl {
    return this.addCars.get("Name") as FormControl;
  }

  get Rating(): FormControl {
    return this.addCars.get("Rating") as FormControl;
  }

  get Author(): FormControl {
    return this.addCars.get("Author") as FormControl;
  }

  get Genre(): FormControl {
    return this.addCars.get("Genre") as FormControl;
  }

  get is_Book_Available(): FormControl {
    return this.addCars.get("is_Book_Available") as FormControl;
  }

  get Description(): FormControl {
    return this.addCars.get("Description") as FormControl;
  }

  get lent_By_User_id(): FormControl {
    return this.addCars.get("lent_By_User_id") as FormControl;
  }

  get currently_Borrowed_By_User_Id(): FormControl {
    return this.addCars.get("currently_Borrowed_By_User_Id") as FormControl;
  }

}
