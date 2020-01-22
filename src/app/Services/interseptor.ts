import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";

import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, tap, filter, take, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from './loader.service';
import { saveCookie, getToken, deleteToken, isAuthorized } from './cookie.service';
import { UserService } from './user.service';

@Injectable()
export class ParamInterceptor implements HttpInterceptor{
    duration_for_snacker = 5;

    constructor(private http: HttpClient, private router : Router, private snacker: MatSnackBar,
        private loaderService: LoaderService, private userService:UserService
        ){}

    private example = of(1);

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    private Redirect()
    {
        deleteToken("access");
        deleteToken("refresh");
        this.router.navigate(['login']);
        this.snacker.open("You should login again","Undo",{
            duration: this.duration_for_snacker * 1000
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
        return this.userService.refresh(getToken('refresh'), getToken('access')).pipe(
        catchError(error => {
            if(error.status === 401)
            {
                this.Redirect(); 
                this.loaderService.isLoading.next(false);
                return of(false);
            }
            console.log(error);

        } ),
        switchMap((token: any) => {
            console.log(token);
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.jwt);
            saveCookie(token.access);
            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + getToken("access") );
            request = request.clone({
                headers: myHeaders
            });
            return next.handle(request).pipe(
                tap(
                    response=> this.loaderService.isLoading.next(false)
                )
                );
        }))

    } else {
        return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + getToken("access") );
            request = request.clone({
                headers: myHeaders
            });
            return next.handle(request).pipe(
                tap(
                    response=> this.loaderService.isLoading.next(false)
                )
                );
        }));
    }
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        // console.log(getToken('access'));
        // console.log(getToken('refresh'));

        this.loaderService.isLoading.next(true); 
        if(req.url.includes("login") || req.url.includes("registr") ){  /// Delete tokens if we want login or registr 
            deleteToken('access');
            deleteToken("refresh");
        }
        if (req.url.includes('refresh'))
        {
            return next.handle(req).pipe(
                tap(
                    response=> this.loaderService.isLoading.next(false)
                )
                );
        }
        if(isAuthorized()){ /// and if we want another path we attach token 
            const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + getToken("access") );
            req = req.clone({
                headers: myHeaders
            });
        }

        // this.example.pipe(
        //     delay(2000)
        // ).subscribe(
        //     () => {this.loaderService.isLoading.next(false); }
        // );
        //console.log(req.headers);
        return next.handle(req).pipe(
            catchError(error => {  
                req.headers.delete('Authorization');
                if(error.status === 401){ /// if we catch 401 access token is expire
                    return this.handle401Error(req,next);
                }
                else{
                    let text:string ; 
                    if(error.status === 500)
                    {
                        text = "server error. Try to reconnect";
                        this.snacker.open(text,"OK");
                    }
                    // this.example.pipe(
                    //     delay(2000)
                    // ).subscribe(
                    //     () => {this.loaderService.isLoading.next(false); }
                    // );
                    return throwError(error);
                }
            }),
            tap(response =>
                {
                    this.loaderService.isLoading.next(false); 
                }
            )
        );
    }

}