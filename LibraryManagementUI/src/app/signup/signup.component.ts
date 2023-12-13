import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LibrarymanagementService } from '../librarymanagement.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required]),
    tokensAvailable: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]),
    booksBorrowed: new FormControl('', [Validators.required ]),
    bookslent: new FormControl('', [Validators.required ])
  });

  constructor(private user: LibrarymanagementService ,private loginrouter : Router) {}

  collection : any = []

  route = "signup"
  ngOnInit(): void {
    
  }
  CollectUser(){ 
    console.log('Form Details', this.registerForm.value)
    if (this.registerForm.valid)
    {
      console.log("Inside if condition");
      
      this.user.RegisterUser(this.registerForm.value , this.route).subscribe((result)=>{
        console.warn("result is here",result)
        this.collection = result;
        if(this.collection != null)
        {
          this.registerForm.reset()
          this.loginrouter.navigate(['/']);   
        }
        
      })
     }
    else {
       console.log("fail");
    this.registerForm?.markAsTouched();
    console.log("add user val",this.registerForm);
    }
  }
  get FullName() :FormControl {
    return this.registerForm.get("fullName") as FormControl;
  }
  
  get Email() : FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  
  get TokensAvailable() : FormControl{
    return this.registerForm.get("tokensAvailable") as FormControl;
  }

  get BooksBorrowed() : FormControl{
    return this.registerForm.get("tokensAvailable") as FormControl;
  }

  get Bookslent() : FormControl{
    return this.registerForm.get("tokensAvailable") as FormControl;
  }

  get Password() : FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  
  get confirmPassword() : FormControl{
    return this.registerForm.get("confirmPassword") as FormControl;
  }

}
