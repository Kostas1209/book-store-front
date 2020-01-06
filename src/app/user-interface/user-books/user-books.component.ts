import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/Services/Server.Service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
  providers: [HttpService, HttpClient]
})
export class UserBooksComponent implements OnInit {

  books : any
  isError : boolean;
  message : string;
  constructor(private httpService : HttpService) {
    this.isError = false;
    this.message = '';
  }

  ngOnInit() {
    this.httpService.getData('http://localhost:8000/api/user_basket/',{},"access").
    subscribe(data =>  {
                  this.books = data["books"];
                  console.log(this.books);
                },
              error => {
                this.isError = true;
                this.message = error.error
              });
    console.log(this.books)
  }

  BuyBooks(){
    this.httpService.postData('http://localhost:8000/api/sell_books/',{},"access").
    subscribe(data =>  {
      this.isError = true;
      this.message = "Thank you for your order"; 
    },
    error => {
      this.isError = true;
      this.message = error.error
    });
  }
}
