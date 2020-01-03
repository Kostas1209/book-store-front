import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';
import { Book } from '../Models/Models';


@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [HttpService, HttpClient]
})
export class BookComponent implements OnInit {

  books : Book[] = [];
  data_user :any = {};
  search_data :string = "";
  isError : boolean;
  error_message : string;
  amount_of_order : number;

  constructor(private httpService : HttpService){
    this.isError = false;
    this.error_message = '';
    this.amount_of_order=0;
  }

  ngOnInit(){   
    this.httpService.getData('http://localhost:8000/api/book_catalog/',this.data_user).
    subscribe(data => {
                    this.books = data["books"];
                    console.log(this.books); 
                  });
    //console.log(this.books)
  }

  Search(){
    const data_book={
      title:this.search_data ,
    };
    console.log(data_book);
    this.httpService.postData('http://localhost:8000/api/search/',data_book).
    subscribe(data => {
                this.books = data["books"];
                this.isError = false;
              },
              error => {
                console.log(error);
                this.error_message = error.error;
                this.isError = true;   
              });
  }

  AddToBasket(id:number,amount:number){
    const data_book={
      book_id:id ,
      amount:amount,
    };
    this.httpService.postData('http://localhost:8000/api/user_basket/',data_book,"access").
    subscribe(data => {
      this.books = data["books"];
      this.isError = false;
    },
    error => {
      console.log(error);
      this.error_message = error.error;
      this.isError = true;   
    });
  }

}
