import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/models'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, HttpClient]
})
export class UserComponent  {
  result: any;
  data_user :any = {};
  user: User = new User();

  constructor(private user_service: UserService, private router:Router){

    this.user_service.GetUserIngo().
    subscribe(data => {
      this.result = data;
      this.user.Name = data["first_name"];
      this.user.LastName = data["last_name"];
      console.log(this.result);
    });   
  }

  Send (){
    this.user_service.ChangeUserInfo(this.user.Name,this.user.LastName).
    subscribe(data => console.log("Success"));
  }

}