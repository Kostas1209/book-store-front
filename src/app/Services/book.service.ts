import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cache } from './cache.decorator';
 

@Injectable()
export class BookService{

    constructor(private http: HttpClient){ }

    @Cache({
        ttl: 20000
    })
    getBookCatalog(){
        return this.http.get(environment.domain + 'api/book_catalog/',{} )
        
    }


    @Cache({
        ttl: 20000
    })
    searchBook(title: string){
        const data_book={
            title:title 
        };
        return this.http.post(environment.domain + 'api/search/',data_book)
        
    }


    @Cache({
        ttl: 20000
    })
    singleBook(book_id : number){
        return this.http.get(environment.domain + 'api/single_book/?id=' + book_id);
    }

    @Cache({
        ttl: 20000
    })
    sellBooks(books)
    {
        return this.http.post(environment.domain + 'api/sell_books/',{books : books});
    }

} 
