import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailPageComponent } from './book-detail-page/book-detail-page.component';
import { BookLandingPageComponent } from './book-landing-page/book-landing-page.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { HomeComponent } from './home/home.component';
import { LentedBooksComponent } from './lented-books/lented-books.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authgaurdGuard } from './Guard/authgaurd.guard';

const routes: Routes = [

  {
    component: HomeComponent,
    path: "Home"
  },
  {
    component: LoginComponent,
    path: "Login"
  },
  {
    component: SignupComponent,
    path: "RegisterUser"
  },
  {
    component: AddBookComponent,
    path: "AddBooks",
    canActivate : [authgaurdGuard]
  },
  {
    component: BookLandingPageComponent,
    path: ""
  },
  {
    component: BookDetailPageComponent,
    path: "viewdetails/:id",
    canActivate : [authgaurdGuard]
  },
  {
    component: LentedBooksComponent,
    path: "ViewlentedBooks",
    canActivate : [authgaurdGuard]
  },
  {
    component: BorrowedBooksComponent,
    path: "ViewBorrowedBooks",
    canActivate : [authgaurdGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
