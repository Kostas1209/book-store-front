
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserBooksComponent } from './user-books.component';

@NgModule({
  declarations: [
    UserBooksComponent,
  ],
  imports: [
    BrowserModule,
  ],
  bootstrap: [],
  exports:[UserBooksComponent]
})
export class UserBookModule { }
