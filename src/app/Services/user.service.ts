import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserService{

    constructor(private http: HttpClient){ }

    Login(email, password){
        const data ={
            email:email,
            password: password
        };
        return this.http.post(environment.domain + "api/login/", data);
    }

    Registr(username , first_name, last_name, email, password){
        const user_info = { username:username, first_name: first_name,
        last_name: last_name, email:email,password: password};

        return this.http.post(environment.domain + "api/registr/", user_info);
    }

    GetUserIngo(){
        return this.http.get(environment.domain + "api/user_info");
    }

    ChangeUserInfo(first_name:string, last_name : string){
        const data ={
            "first_name" : first_name,
            "last_name" : last_name
          };
        return this.http.put(environment.domain + "api/user_info/",data);
    }

    LogOut(){
        return this.http.post(environment.domain + "api/logout/", {});
    }

    Refresh(refresh, access){
        return this.http.post(environment.domain + "api/refresh/", {refresh: refresh, access: access});
    }
    
    SendUserPhoto(image:any)
    {
        return this.http.post(environment.domain + 'api/user_avatar/', {image : image});
    }

    GetUserAvatar()
    {
        return this.http.get(environment.domain + 'api/user_avatar/');
    }


}

