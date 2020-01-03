import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/Services/Server.Service';
import { Book } from 'src/app/Models/Models';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
  providers: [HttpService, HttpClient]
})
export class UserBooksComponent implements OnInit {

  books : any
  isError : boolean;
  error_message : string;
  constructor(private httpService : HttpService) {
    this.isError = false;
    this.error_message = '';
  }

  ngOnInit() {
    this.httpService.getData('http://localhost:8000/api/user_basket/',{},"access").
    subscribe(data =>  {
                  this.books = data["books"];
                  console.log(this.books);
                },
              error => {
                this.isError = true;
                this.error_message = error.error
              });
    console.log(this.books)
  }

}
