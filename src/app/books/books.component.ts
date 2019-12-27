import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';
import { Book } from '../Models/Models'

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [HttpService, HttpClient]
})
export class BookComponent implements OnInit {

  books : Book[] = [];
  data_user :any = {};
  constructor(private httpService : HttpService){}

  ngOnInit(){   
    this.httpService.getData('http://localhost:8000/api/book_catalog/',this.data_user).
    subscribe(data => this.books = data["books"] );
    //console.log(this.books)
  }

}