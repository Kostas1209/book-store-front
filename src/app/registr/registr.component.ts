import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from '../models/models';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss'],
  providers: [UserService, HttpClient]
})
export class RegistrComponent {

    data_is_received : boolean = false;
    result:string;
    user: User = new User;
    myForm : FormGroup;
    duration_for_snacker: number=5;
    
    constructor(private user_service : UserService, private router:Router, private snacker:MatSnackBar){
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
        this.user_service.registr(this.user.Username, this.user.Name, this.user.LastName, this.user.Email, this.user.Password)
        .subscribe(
            (data: string) => {
                this.result=data;
                this.data_is_received = true;
                this.router.navigate(['login']);
            },
            error =>
             {
                 console.log(error)
                this.snacker.open(error.error,"OK",{
                    duration: this.duration_for_snacker * 1000
                });
             }
        ) ; 
    }

    bookCatalog()
    {
        this.router.navigate(['books']);
    }

    login()
    {
        this.router.navigate(['login']);
    }
}