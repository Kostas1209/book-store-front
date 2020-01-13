import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/models';
import {Router} from '@angular/router';
import {BookService} from '../services/book'


@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BookService, HttpClient]
})
export class BookComponent implements OnInit {

  books : Book[] = [];
  data_user :any = {};
  search_data :string = "";
  isError : boolean;
  error_message : string;

  constructor(private book_service: BookService ,private router : Router){
    this.isError = false;
    this.error_message = '';
  }

  ngOnInit(){   
    this.book_service.GetBookCatalog().
    subscribe(data => {
                this.books = data["books"];
                this.isError = false;
              },
              error => {
                this.error_message = error.error;
                this.isError = true;   
              });
  }

  Search(){
    this.book_service.SearchBook(this.search_data).
    subscribe(data => {
                this.books = data["books"];
                this.isError = false;
              },
              error => {
                this.error_message = error.error;
                this.isError = true;   
              });
  }

  ReserveBook(id : number ){
    console.log('single_book/?id=' + id);
    this.router.navigate(
      ['single_book'],
      {
        queryParams:{
          'id': id,
        }
      }
    );// redirect to single_book?=id
  }

}
