import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {saveCookie,deleteToken} from '../services/cookie.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../registr/registr.component.scss'],
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
    duration_for_snacker: number = 5;

    constructor(private user_service: UserService, private router : Router, private snacker: MatSnackBar){
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
        
        this.user_service.login(this.user_email,this.user_password).
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
                    this.snacker.open("Password or email is not correct","OK",{
                        duration: this.duration_for_snacker * 1000
                    });
                }
        ); 
    }

    registr(){
        this.router.navigate(['registration']);    }
    
    bookCatalog(){
        this.router.navigate(['books']);    
    }

}