import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HttpService } from 'src/app/Services/Server.Service';

import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/server.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
  providers: [ HttpClient/*, MessageService*/],
})
export class UserBooksComponent implements OnInit/*, OnDestroy*/ {

  books : any[] = [];
  isError : boolean;
  subscription$: Subscription;
  error_message: string;

  constructor(private messageService: MessageService) {
    this.isError = false;
    this.subscription$ = this.messageService.getMessage().subscribe(
      message => {
         console.log(message);
         this.books.push(message);
        },
      error => {this.isError = true; this.error_message = error.message;}
    );

  }

  ngOnInit() {
  }

  // ngOnDestroy(): void {
  //   // нужно отписаться чтобы не выгружать память
  //   this.subscription.unsubscribe();
  // }

  BuyBooks(){

  }

  DeleteBook(){

  }


}
