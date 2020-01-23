import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/models'
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, HttpClient]
})
export class UserComponent implements OnInit  {
  result: any;
  data_user :any = {};
  files : any;
  user: User = new User();
  reader:FileReader;
  image : string;
  duration_for_snacker: number = 5;

  constructor(private user_service: UserService, private router:Router, private snacker : MatSnackBar){
    this.reader = new FileReader();
    this.user_service.getUserInfo().
    subscribe(data => {
      let result = data;
      if(typeof(data) === 'string') /// if we get info from cache 
      {
        result = JSON.parse(<string>data);  
      }
      this.user.Name = result["first_name"];
      this.user.LastName = result["last_name"];
    });   
  }

  ngOnInit(){
    this.user_service.getUserAvatar().
    subscribe(
      success => {
        this.image = "data:image/jpeg;base64," + success;
      },
      error => {
        this.snacker.open("image not load","OK",{
          duration: this.duration_for_snacker * 1000
      });
      }
    )
  }

  changeUserInfo (){
    this.user_service.changeUserInfo(this.user.Name,this.user.LastName).
    subscribe(data =>
               this.snacker.open("Change successfully","OK",{
                   duration: this.duration_for_snacker * 1000})
      );
    localStorage.removeItem("getUserInfo_cached"); /// remove previous info from cache
  }

  addPhoto(event) {
    this.files = event.target.files[0];
    this.reader.readAsDataURL(this.files);
    this.reader.onload = ()=>{}
    
  }

  sendPhoto()
  {
    if (this.files) {
      this.user_service.sendUserPhoto(this.reader.result).
      subscribe(
        success => {
          localStorage.removeItem("getUserAvatar_cached"); /// remove  previous photo from cache 
          this.user_service.getUserAvatar().   /// new  photo save to cache 
          subscribe(
            success => {
              this.image = 'data:image/jpeg;base64,' + success;
            },
            error => {
              this.snacker.open(error.error,"OK",{
                duration: this.duration_for_snacker * 1000
              });
            }
          );
        }
        ,
        error=>{
                this.snacker.open(error.error,"OK",{
                duration: this.duration_for_snacker * 1000
                });
        }
      );
    }
  }

}