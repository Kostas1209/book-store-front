import {Injectable} from '@angular/core';

@Injectable()
export class User
{
    Name : string;
    LastName: string;
    Username : string;
    Email: string;
    Password : string;
}

@Injectable()
export class Book
{
    title : string;
    author: string;
    amount_in_storage : number;
    price : number;
    id : number;
}