import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
     
    postData(path : string, data ){
         
        //const myHeaders = new HttpHeaders().set('Authorization', 'my-auth-token');
        console.log(data);
        return this.http.post(path, data); 
    }

    getData(path : string , data)
    {
        //console.log(data);
        return this.http.get(path, data);
    }
}


