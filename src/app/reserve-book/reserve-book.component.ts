import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/models';
import { BookService } from 'src/app/services/book.service'
import { ActivatedRoute } from '@angular/router';
import { MessageService, UserBasketService } from '../services/server.service';
import { Observable, Subscription } from 'rxjs';

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
  subject: Subscription;

  constructor(private book_service:BookService, private route:ActivatedRoute, private messageService: MessageService,
    private userBooks : UserBasketService) { 
    //console.log(router.url);
    this.book = new Book;
    this.isError = false;
    this.error_message = '';

    this.subject = messageService.getMessage().subscribe(
      data => {
        console.log(data);
            if (this.book.id === data.text.id)
            {
              this.book.amount_in_storage += data.text.amount;
            }
      }
    );

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
                this.userBooks.books.forEach(element => {
                  if(element.id === this.book.id)
                  {
                    this.book.amount_in_storage -= element.amount;
                  }
                });
                this.isError = false;
              },
              error => {  
                this.error_message = error.message;
                this.isError = true;   
              });
  }

  AddBook(){
    this.userBooks.AddBook({id:this.book.id, amount:this.amount_of_order, title:this.book.title});
    //this.messageService.sendMessage({id:this.book.id, amount:this.amount_of_order, title:this.book.title});
    this.book.amount_in_storage -= this.amount_of_order;
  }

  clearMessages(): void {
    this.messageService.clearMessage();
  }

}
