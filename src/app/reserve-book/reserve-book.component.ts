import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';
import { Book } from '../Models/Models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.css'],
  providers: [HttpService, HttpClient]
})
export class ReserveBookComponent implements OnInit {

  book : Book;
  data_user :any = {};
  isError : boolean;
  error_message : string;
  amount_of_order =  1;

  constructor(private httpService:HttpService, private router : Router) { 
    //console.log(router.url);
    this.book = new Book;
    this.isError = false;
    this.error_message = '';
  }

  ngOnInit() {
    this.httpService.getData('http://localhost:8000/api' + this.router.url,{}).
    subscribe(data => {
                this.book = data["book"];
                this.isError = false;
              },
              error => {
                console.log(error);
                this.error_message = error.error;
                this.isError = true;   
              });
  }

  AddToBasket(id:number){
    console.log(this.amount_of_order);
    const data_book={
      book_id: id ,
      amount: this.amount_of_order,
    };
    this.httpService.postData('http://localhost:8000/api/user_basket/',data_book,"access").
    subscribe(data => {

    },
    error => {
      console.log(error);
      this.error_message = error.error;
      this.isError = true;   
    });
  }

}
