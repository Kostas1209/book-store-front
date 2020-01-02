import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';
import { Book } from '../Models/Models'
import { deleteToken } from '../Services/CookieService';
import { Router } from '@angular/router';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [HttpService, HttpClient]
})
export class BookComponent implements OnInit {

  books : Book[] = [];
  data_user :any = {};
  search_data :string = "a";
  IsLogin: boolean = true;

  constructor(private httpService : HttpService, private router : Router){}

  ngOnInit(){   
    this.httpService.getData('http://localhost:8000/api/book_catalog/',this.data_user).
    subscribe(data => this.books = data["books"] );
    //console.log(this.books)
  }

  Search(){
    const data_book={
      title:this.search_data ,
    };
    console.log(data_book);
    this.httpService.postData('http://localhost:8000/api/search/',data_book).
    subscribe(data => this.books = data["books"]);
  }
  
  
  LogOut(){
    this.httpService.postData('http://localhost:8000/api/logout/',{},"access").
    subscribe(data =>  
      {
        this.router.navigate(['login'])
        deleteToken("access");
        deleteToken("refresh");
      });
  }

}
