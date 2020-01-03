import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpService} from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {saveCookie} from '../Services/CookieService';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../registr/registr.component.css'],
  providers: [HttpService, HttpClient]
})
export class LoginComponent {

    error :any;
    data_user ;
    data_is_received : boolean = undefined;
    result:any;
    myForm : FormGroup;
    error_message : string;

    constructor(private httpService: HttpService, private router : Router){
        this.data_user = {email:"",password:""};
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
        console.log( this.httpService.postData("http://localhost:8000/api/login/", this.data_user )
        .subscribe(
            (data:any) => {
                this.result=data;
                this.data_is_received = true;
                this.router.navigate(['book']);
                saveCookie(this.result["access"],this.result["refresh"]);
                //console.log(getToken("access"));
            },
            error => {this.data_is_received = false;
                    this.data_user.password = "";
                    this.error_message = error.error;
                
                }
        )) ; 
    }

    Registr(){
        this.router.navigate(['registration']);
    }

}