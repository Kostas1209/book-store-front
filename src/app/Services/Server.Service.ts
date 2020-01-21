import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BookService } from './book.service';
import { MatSnackBar } from '@angular/material';
  

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<any>();

    constructor(){}
    
    sendMessage(message: any): void {
        this.subject.next({ text: message });
    }
 
    clearMessage(): void {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

@Injectable({ providedIn: 'root' })
export class UserBasketService
{
    books : any[] = [];

    constructor(private messageService : MessageService, private bookService : BookService,
        private snacker : MatSnackBar){}

    addBook(book)
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

    deleteBook(id : number)
    {
        var nomer = this.InBasket(id);
        if(nomer === null)
            return ;
        
        this.books.splice(nomer,1);
    }

    InBasket(id : number)
    {
        for (var i = 0;i < this.books.length; i++)
        {
            if (this.books[i].id === id)
            {
                return i;
            }
        }
    }

    buyBooks()
    {
        var books_for_send = [];
        this.books.forEach(element => {
            books_for_send.push({id:element.id, amount:element.amount});
        });
        this.bookService.sellBooks(books_for_send).subscribe(
            success => this.snacker.open("You buy books","OK"),
            error => console.log(error.error)
        );
    }
}
