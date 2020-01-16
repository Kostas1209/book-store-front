import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { idText } from 'typescript';
  

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

    constructor(private messageService : MessageService){}

    AddBook(book)
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

    DeleteBook(id : number)
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
        return null;
        ///return number of element of null if not exist


        // this.books.sort(this.compareFunction);
        // // this.books.forEach(element => {
        // //     console.log(element);
        // // });
        // var a =0,b=this.books.length;
        // var m;
        // while(a-b >= 1)
        // {
        //     m = Math.floor( (a + b)/2 );
        //     if (id === this.books[m].id)
        //     {
        //         return  m;
        //     }

        //     if (id < this.books[m].id)
        //     {
        //         b = m; 
        //     }
        //     else{
        //         a = m;
        //     }
        // }
        // if (id === this.books[a].id)
        // {
        //     return a;
        // }
        // else{
        //     return null;
        // }

    }

    // private compareFunction(a, b) : number
    // {
    //     if (a.id > b.id)
    //         return 1;
    //     if (a.id === b.id)
    //         return 0;
    //     if (a.id < b.id)
    //         return -1;
    // }
}
