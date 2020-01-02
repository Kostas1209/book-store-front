import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpService} from '../Services/Server.Service';
import {User} from '../Models/Models';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.css'],
  providers: [HttpService, HttpClient]
})
export class RegistrComponent {

    data_is_received : boolean = false;
    result:string;
    user: User = new User;
    myForm : FormGroup;
    constructor(private httpService: HttpService, private router:Router){
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
        const user_data = {username : this.user.Username, password:this.user.Password, email: this.user.Email,
            last_name : this.user.LastName, first_name : this.user.Name};
        console.log(this.user);
        this.httpService.postData("http://localhost:8000/api/registr/", user_data)
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