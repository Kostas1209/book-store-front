import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpService} from '../Services/Server.Service';
import { HttpClient } from '@angular/common/http';

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
    constructor(private httpService: HttpService){
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
            (data:any) => {this.result=data;this.data_is_received = true;},
            error => {this.data_is_received = false;
                    this.data_user.password = ""}
        )) ; 
        /// Write tokens to cache
    }

}