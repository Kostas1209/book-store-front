import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/models';
import {Router} from '@angular/router';
import {BookService} from '../services/book.service'
import {isAuthorized} from '../services/cookie.service'
import { MessageService, UserBasketService } from '../services/server.service';
import { Subscription} from 'rxjs';


@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BookService, HttpClient]
})
export class BookComponent implements OnInit {

  isLogin :boolean;
  books : Book[] = [];
  data_user :any = {};
  search_data :string = "";
  isError : boolean;
  error_message : string;
  subject : Subscription;

  constructor(private book_service: BookService ,private router : Router, private userBooks : UserBasketService,
    private messageService : MessageService){
    this.isLogin = isAuthorized();
    this.isError = false;
    this.error_message = '';
    this.subject = messageService.getMessage().subscribe(
      data => {
          this.books.forEach(element => {
            if (element.id === data.text.id)
            {
              element.amount_in_storage += data.text.amount;
            }
         });
      }
    )
  }

  ngOnInit(){   
    this.book_service.GetBookCatalog().
    subscribe(data => {
                this.books = data["books"];
                this.isError = false;
                this.recountAmount();
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
    this.router.navigate(
      ['single_book'],
      {
        queryParams:{
          'id': id,
        }
      }
    );// redirect to single_book?=id
  }

  Login()
  {
    this.router.navigate(['login']);
  }


  private recountAmount()
  {
    this.books.forEach(element => {
       this.userBooks.books.forEach(book => {
         if(element.id == book.id)
         {
           element.amount_in_storage -= book.amount;
         }
       });
    }); 
  }

}
