import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/models';
import { BookService } from 'src/app/services/book.service'
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/server.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.css'],
  providers: [BookService, HttpClient/*, MessageService*/]
})
export class ReserveBookComponent implements OnInit {

  book : Book;
  isError : boolean;
  error_message : string;
  amount_of_order =  1;


  constructor(private book_service:BookService, private route:ActivatedRoute, private messageService: MessageService) { 
    //console.log(router.url);
    this.book = new Book;
    this.isError = false;
    this.error_message = '';
  }

  ngOnInit() {
    const querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
          this.book.id = queryParam['id'];
      }
    );
    this.book_service.SingleBook(<number>this.book.id).
    subscribe(data => {
                this.book = data["book"];
                this.isError = false;
              },
              error => {  
                this.error_message = error.message;
                this.isError = true;   
              });
  }

  AddBook(){
    this.messageService.sendMessage({id:this.book.id, amount:this.amount_of_order, title:this.book.title});
    this.book.amount_in_storage -= this.amount_of_order;
  }

  clearMessages(): void {
    this.messageService.clearMessage();
  }

}
