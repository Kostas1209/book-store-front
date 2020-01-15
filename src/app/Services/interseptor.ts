import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { isAuthorized, getToken, deleteToken ,saveCookie} from './cookie.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from './loader.service';

@Injectable()
export class ParamInterceptor implements HttpInterceptor, OnDestroy{

    duration_for_snacker = 5;

    constructor(private http: HttpClient, private router : Router, private snacker: MatSnackBar,
        private loaderService: LoaderService
        ){}

    private example = of(1);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(getToken('access'));
        // console.log(getToken('refresh'));

        this.loaderService.isLoading.next(true); 
        if(req.url.includes("login") || req.url.includes("registr") ){  /// Delete tokens if we want login or registr 
            deleteToken('access');
            deleteToken("refresh");
        }
        if (req.url.includes('refresh'))
        {
            this.loaderService.isLoading.next(false); 
            return next.handle(req);
        }
        if(isAuthorized()){ /// and if we want another path we attach token 
            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + getToken("access") );
            req = req.clone({
                headers: myHeaders
            });
        }

        this.example.pipe(
            delay(2000)
        ).subscribe(
            () => {this.loaderService.isLoading.next(false); }
        );


        //console.log(req.headers);
        return next.handle(req).pipe(
            catchError(error => {  
                req.headers.delete('Authorization');
                this.loaderService.isLoading.next(true); 
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
                            this.example.pipe(
                                    delay(2000)
                                ).subscribe(
                                 () => {this.loaderService.isLoading.next(false); }
                            );
                        },
                        error => { // if refresh token is not success
                            if(error.status === 500)
                            {
                                this.snacker.open("Ooops");
                                deleteToken("access");
                                deleteToken("refresh");
                                this.example.pipe(
                                    delay(2000)
                                ).subscribe(
                                    () => {this.loaderService.isLoading.next(false); }
                                );
                                return Observable.throw(error);
                            }
                            deleteToken("access");
                            deleteToken("refresh");
                            this.router.navigate(['login']);
                            this.snacker.open("You should login again","Undo",{
                                duration: this.duration_for_snacker * 1000
                            });
                            this.example.pipe(
                                delay(2000)
                            ).subscribe(
                                () => {this.loaderService.isLoading.next(false); }
                            );
                            Observable.throw(error);
                        },
                        () =>{
                            this.example.pipe(
                                delay(2000)
                            ).subscribe(
                                () => {this.loaderService.isLoading.next(false); }
                            );
                        }
                    )
                }
                else{
                    this.snacker.open("Ooops");
                    this.example.pipe(
                        delay(2000)
                    ).subscribe(
                        () => {this.loaderService.isLoading.next(false); }
                    );
                    return Observable.throw(error);
                }
            })
        );
    }

    ngOnDestroy()
    {
        this.loaderService.isLoading.next(false); 
    }

}