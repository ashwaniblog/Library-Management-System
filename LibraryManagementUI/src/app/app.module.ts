import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule} from "@angular/forms";
import { FormsModule  } from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookLandingPageComponent } from './book-landing-page/book-landing-page.component';
import { AddBookComponent } from './add-book/add-book.component';
import { DatePipe } from '@angular/common';
import { BookDetailPageComponent } from './book-detail-page/book-detail-page.component';
import { LentedBooksComponent } from './lented-books/lented-books.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BookLandingPageComponent,
    AddBookComponent,
    BookDetailPageComponent,
    LentedBooksComponent,
    BorrowedBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
