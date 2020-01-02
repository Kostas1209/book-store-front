import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getToken} from './CookieService';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
     
    postData(path : string, data, access = null){
        if (access != null)
        { 
            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer:' +getToken("access") );
            return this.http.post(path, data,{headers:myHeaders}); 
        }
        //console.log(data);
        return this.http.post(path, data);
    }

    getData(path : string , data, access = null)
    {
        if(access != null)
        {
            console.log("Authorized");
            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' +getToken("access") );
            const resource ={
                headers : myHeaders,
                body : data,
            };
            return this.http.get(path,resource );
        }

        return this.http.get(path, data);
    }

    putData(path : string, data, access = null)
    {
        if(access != null)
        {
            console.log("Authorized put");
            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + getToken("access") );
            console.log(getToken("access"));
            console.log(myHeaders);
            return this.http.put(path,data,{headers: myHeaders});
        }

        return this.http.put(path, data);
    }
}

