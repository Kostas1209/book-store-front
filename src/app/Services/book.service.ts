import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
 
@Injectable()
export class BookService{

    constructor(private http: HttpClient){ }

    getBookCatalog(){
        return this.http.get(environment.domain + 'api/book_catalog/',{} )
        
    }

    searchBook(title: string){
        const data_book={
            title:title 
        };
        return this.http.post(environment.domain + 'api/search/',data_book)
        
    }

    singleBook(book_id : number){
        return this.http.get(environment.domain + 'api/single_book/?id=' + book_id);
    }

    sellBooks(books)
    {
        return this.http.post(environment.domain + 'api/sell_books/',{books : books});
    }

} 
