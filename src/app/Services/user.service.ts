import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cache } from './cache.decorator';

@Injectable()
export class UserService{

    constructor(private http: HttpClient){ }

    login(email, password){
        const data ={
            email:email,
            password: password
        };
        return this.http.post(environment.domain + "api/login/", data);
    }

    registr(username , first_name, last_name, email, password){
        const user_info = { username:username, first_name: first_name,
        last_name: last_name, email:email,password: password};

        return this.http.post(environment.domain + "api/registr/", user_info);
    }


    @Cache({
        ttl:5000
    })
    getUserInfo(){
        return this.http.get(environment.domain + "api/user_info");
    }

    
    changeUserInfo(first_name:string, last_name : string){
        const data ={
            "first_name" : first_name,
            "last_name" : last_name
          };
        return this.http.put(environment.domain + "api/user_info/",data);
    }

    logOut(){
        return this.http.post(environment.domain + "api/logout/", {});
    }

    refresh(refresh, access){
        return this.http.post(environment.domain + "api/refresh/", {refresh: refresh, access: access});
    }
    
    sendUserPhoto(image:any)
    {
        return this.http.post(environment.domain + 'api/user_avatar/', {image : image});
    }

    @Cache({
        ttl:5000
    })
    getUserAvatar()
    {
        return this.http.get(environment.domain + 'api/user_avatar/');
    }


}

