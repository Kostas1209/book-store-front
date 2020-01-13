
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserBookModule } from './user-books/user-books.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    UserBookModule,
  ],
  bootstrap: [],
  exports: []
})
export class UserInterfaceModule { }
