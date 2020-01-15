import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/server.service';
import { deleteToken } from '../services/cookie.service';


@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css'],
  providers: [UserService]
})
export class UserInterfaceComponent implements OnInit {
  books : any[] = [];
  isError : boolean;
  subscription$: Subscription;
  error_message: string;

  constructor(private httpService : UserService, private router : Router, 
    private messageService : MessageService) {
    this.isError = false;
    this.subscription$ = this.messageService.getMessage().subscribe(
      message => {
        console.log(message.text);
         this.AddBookToBasket(message.text);
        },
      error => {this.isError = true; this.error_message = error.message;}
    );
   }

  ngOnInit() {
  }

  LogOut(){
    this.httpService.LogOut().
    subscribe(data =>  
      {
        deleteToken('access');
        deleteToken('refresh');
        this.router.navigate(['login'])
      });
  }

  DeleteBooks()
  {
    
  }

  goToBooks()
  {
    this.router.navigate(['books']);
  }

  BuyBooks(){
    
  }

  AddBookToBasket(book)
  {
    for(var i=0;i<this.books.length;++i)
    {
       if(this.books[i].id == book.id)
       {
          this.books[i].amount += book.amount;
          return 
       }
    }
    this.books.push(book);
  }

}