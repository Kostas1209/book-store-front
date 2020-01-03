import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { deleteToken } from '../Services/CookieService';
import { HttpService } from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css'],
  providers: [HttpService, HttpClient]
})
export class UserInterfaceComponent implements OnInit {
  @Input() isAuthorize:boolean;
  @Output() IsAuthorizeChange = new EventEmitter<boolean>();

  constructor(private httpService : HttpService, private router : Router) { }

  ngOnInit() {
  }

  LogOut(){
    this.httpService.postData('http://localhost:8000/api/logout/',{},"access").
    subscribe(data =>  
      {
        this.isAuthorize = false;
        this.IsAuthorizeChange.emit(false); /// Change IsAuthorized in general component
        this.router.navigate(['login'])
        deleteToken("access");
        deleteToken("refresh");
      });
  }

  Basket(){
    this.router.navigate(['user_basket']);
  }


}
