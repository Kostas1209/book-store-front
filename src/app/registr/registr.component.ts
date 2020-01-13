import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from '../models/models';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {deleteToken} from '../Services/cookie-service';
import {UserService} from 'src/app/services/user-service';

@Component({
  selector: 'registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.css'],
  providers: [UserService, HttpClient]
})
export class RegistrComponent {

    data_is_received : boolean = false;
    result:string;
    user: User = new User;
    myForm : FormGroup;
    constructor(private user_service : UserService, private router:Router){
        this.user.Name = "Tom";
        this.user.LastName = "Sawyer";
        this.myForm = new FormGroup({
              
            "userName": new FormControl("", Validators.required),
            "userLastname": new FormControl("", Validators.required),
            "userEmail": new FormControl("", [
                                Validators.required, 
                                Validators.email 
                            ]),
            "Username": new FormControl("",
                                        [Validators.required ]),
            "UserPassword": new FormControl("",
                                        [Validators.required]),

        }
        );
    }

    submit(){
        this.user_service.Registr(this.user.Username, this.user.Name, this.user.LastName, this.user.Email, this.user.Password)
        .subscribe(
            (data: string) => {
                this.result=data;
                this.data_is_received = true;
                this.router.navigate(['login']);
            }
            //error => console.log(error)
        ) ; 
    }
}