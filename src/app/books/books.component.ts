import { Component } from '@angular/core';
import { HttpService } from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css','../registr/registr.component.css'],
  providers: [HttpService, HttpClient]
})
export class BookComponent {
}