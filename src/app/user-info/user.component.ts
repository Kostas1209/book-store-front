import { Component, OnInit } from '@angular/core';
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
export class UserComponent implements OnInit  {
  result: any;
  data_user :any = {};
  files : any;
  user: User = new User();
  reader:FileReader;
  image : string;

  constructor(private user_service: UserService, private router:Router){
    this.reader = new FileReader();
    this.user_service.GetUserInfo().
    subscribe(data => {
      this.result = data;
      this.user.Name = data["first_name"];
      this.user.LastName = data["last_name"];
      console.log(this.result);
    });   
  }

  ngOnInit(){
    this.user_service.GetUserAvatar().
    subscribe(
      success => {
        this.image = 'data:image/jpeg;base64,' + success;
      },
      error => {
        console.log(error.error);
      }
    )
  }

  Send (){
    this.user_service.ChangeUserInfo(this.user.Name,this.user.LastName).
    subscribe(data => console.log("Success"));
  }

  addPhoto(event) {
    this.files = event.target.files[0];
    this.reader.readAsDataURL(this.files);
    this.reader.onload = ()=>{}
  }

  SendPhoto()
  {
    if (this.files) {
      this.user_service.SendUserPhoto(this.reader.result).
      subscribe(
        success => {},
      );
    }
  }

}