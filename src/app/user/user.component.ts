import { Component } from '@angular/core';
import { HttpService } from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../Models/Models'

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [HttpService, HttpClient]
})
export class UserComponent  {
  result: any;
  data_user :any = {};
  user: User = new User();

  constructor(private httpService: HttpService, private router:Router){

    this.httpService.getData('http://localhost:8000/api/user_info/',this.data_user, "access").
    subscribe(data => {
      this.result = data;
      this.user.Name = data["first_name"];
      this.user.LastName = data["last_name"];
      console.log(this.result);
    });   
  }

  Send (){
    const data ={
      "first_name" : this.user.Name,
      "last_name" : this.user.LastName
    };
    this.httpService.putData('http://localhost:8000/api/user_info/',data, "access").
    subscribe(data => console.log("Success"));
  }

}