import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {saveCookie,deleteToken} from '../services/cookie.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../registr/registr.component.css'],
  providers: [UserService, HttpClient]
})
export class LoginComponent {

    error :any;
    user_email : string;
    user_password : string;
    data_is_received : boolean = undefined;
    result:any;
    myForm : FormGroup;
    error_message : string;

    constructor(private user_service: UserService, private router : Router){
        deleteToken("access");
        deleteToken("refresh");
        this.user_email = "";
        this.user_password = "";
        this.myForm = new FormGroup({
            "userEmail": new FormControl("", [
                                Validators.required, 
                                Validators.email 
                            ]),
            "UserPassword": new FormControl("",
                                        [Validators.required]),

        }
        );
    }

    submit(){
        
        this.user_service.Login(this.user_email,this.user_password).
        subscribe(
            (data:any) => {
                this.result=data;
                this.data_is_received = true;
                this.router.navigate(['books']);
                saveCookie(this.result["access"],this.result["refresh"]);
                //console.log(getToken("access"));
            },
            error => {
                    this.data_is_received = false;
                    this.user_password = "";
                    this.error_message = error.error;
                }
        ); 
    }

    Registr(){
        this.router.navigate(['registration']);    }
    
    BookCatalog(){
        this.router.navigate(['books']);    
    }

}