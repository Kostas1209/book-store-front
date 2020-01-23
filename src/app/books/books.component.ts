import { Component, OnInit,AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/models';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service'
import { isAuthorized } from '../services/cookie.service'
import { MessageService, UserBasketService } from '../services/user-basket.service';
import { Subscription, fromEvent} from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BookService, HttpClient]
})
export class BookComponent implements OnInit, AfterViewInit {

  isLogin :boolean;
  books : Book[] = [];
  data_user :any = {};
  search_data :string = "";
  isError : boolean;
  error_message : string;
  subject : Subscription;
  duration_for_snacker: number = 5;

  constructor(private book_service: BookService ,private router : Router, private userBooks : UserBasketService,
    private messageService : MessageService, private snacker : MatSnackBar){
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
    this.book_service.getBookCatalog().
    subscribe(data => {
                this.books = data["books"];
                this.isError = false;
                this.recountAmount(); // recount amount of books if user add some to basket
              },
              error => {
                this.error_message = error.error;
                this.isError = true;   
              });
  }

  ngAfterViewInit(){
    // elem ref
    const searchBox = document.getElementById('textInput');

    // streams
    const keyup$ = fromEvent(searchBox, 'keyup');

    // wait .5s between keyups to emit current value
    keyup$
    .pipe(
        map((i : any) => i.currentTarget.value),
        debounceTime(1000)
    )
    .subscribe(
      success => this.search()
    );
  }

  search(){
    this.book_service.searchBook(this.search_data).
    subscribe(data => {
                this.books = data["books"];
                this.isError = false;
              },
              error => {
                this.snacker.open("Nothing not found","Ok",{
                  duration: this.duration_for_snacker * 1000
              }); 
              });
  }

  reserveBook(id : number ){
    this.router.navigate(
      ['single_book'],
      {
        queryParams:{
          'id': id,
        }
      }
    );// redirect to single_book?=id
  }

  login()
  {
    this.router.navigate(['login']);
  }

  registr()
  {
    this.router.navigate(['registration']);
  }

  recountAmount()
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
