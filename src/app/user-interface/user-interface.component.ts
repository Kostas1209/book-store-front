import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MessageService, UserBasketService } from '../services/server.service';
import { deleteToken } from '../services/cookie.service';


@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss'],
  providers: [UserService]
})
export class UserInterfaceComponent implements OnInit {
  isError : boolean;
  //subscription$: Subscription;
  error_message: string;

  constructor(private httpService : UserService, private router : Router, 
    private messageService : MessageService, private books : UserBasketService) {
    this.isError = false;
   }

  ngOnInit() {
  }

  logOut(){
    this.httpService.logOut().
    subscribe(data =>  
      {
        deleteToken('access');
        deleteToken('refresh');
        this.router.navigate(['login'])
      });
  }

  deleteBook(id : number, amount: number)
  {
    this.messageService.sendMessage({id : id, amount : amount});
    this.books.deleteBook(id); 
  }

  goToBooks()
  {
    this.router.navigate(['books']);
  }

  buyBooks(){
    this.books.buyBooks();
    this.books.books = [];
  }

  goToUserCabinet()
  {
    this.router.navigate(['user']);
  }

  // AddBookToBasket(book)
  // {
  //   this.books.AddBook(book);
  // }

}