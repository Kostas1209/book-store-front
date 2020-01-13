import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { isAuthorized, getToken, deleteToken ,saveCookie} from './cookie';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient, private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.url);
        if(req.url.includes("login") || req.url.includes("registr") ){  /// Delete tokens if we want login or registr 
            deleteToken('access');
            deleteToken("refresh");
        }
        if(isAuthorized()){ /// and if we want another path we attach token 
            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + getToken("access") );
            req = req.clone({
                headers: myHeaders
            });
        }

        //console.log(req.headers);
        return next.handle(req).pipe(
            catchError(error => { 
                if(error.status === 401){ /// if we catch 401 access token is expire
                    this.http.post(
                        environment.domain + 'api/refresh/', // try to refresh
                        { refresh : getToken('refresh'), access : getToken('access') }
                    ).subscribe(
                        data => { ///if refresh token is success
                            console.log(data);
                            saveCookie(data['access']);
                            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' +getToken("access") );
                            req = req.clone({
                                        headers: myHeaders
                                        });
                            return next.handle(req)
                        },
                        error => { // if refresh token is not success
                            deleteToken("access");
                            deleteToken("refresh");
                            this.router.navigate(['login']);
                            Observable.throw(error);
                        }
                    )
                }
                else{
                    return Observable.throw(error);
                }
            })
        );
    }

}