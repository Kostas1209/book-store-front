import {Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs';
  
// @Injectable()
// export class HttpService{
  
//     constructor(private http: HttpClient){ }
     
//     postData(path : string, data, access = null){
//         if (access != null)
//         { 
//             //console.log("authorized post");
//             const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' +getToken("access") );
//             return this.http.post(path, data,{headers:myHeaders}); 
//         }
//         //console.log(data);
//         return this.http.post(path, data);
//     }

//     getData(path : string , data, access = null)
//     {
//         if(access != null)
//         {
//             console.log("Authorized get");
//             const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' +getToken("access") );
//             const resource ={
//                 headers : myHeaders,
//                 body : data,
//             };
//             return this.http.get(path,resource );
//         }

//         else{
//             const resource={
//                 headers: new HttpHeaders({
//                     'Content-Type':  'application/json',
//                 }),
//                 body:data,
//             };
//             console.log(data);
//             return this.http.get(path, resource);
//         }
        
//     }

//     putData(path : string, data, access = null)
//     {
//         if(access != null)
//         {
//             console.log("Authorized put");
//             const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + getToken("access") );
//             // console.log(getToken("access"));
//             // console.log(myHeaders);
//             return this.http.put(path,data,{headers: myHeaders});
//         }

//         return this.http.put(path, data);
//     }
// }

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<any>();

    constructor(){}
    
    sendMessage(message: string): void {
        this.subject.next({ text: message });
    }
 
    clearMessage(): void {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
