import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/server.service';
import { deleteToken } from '../services/cookie';


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

  constructor(private httpService : UserService, private router : Router, private messageService : MessageService) {
    this.isError = false;
    this.subscription$ = this.messageService.getMessage().subscribe(
      message => {
         this.books.push(message.text);
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

  Basket(){
    
  }


}
