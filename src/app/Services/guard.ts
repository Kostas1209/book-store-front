import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { isAuthorized } from './cookie.service';
import { ServiceUrl } from './path.service';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private serviceUrl : ServiceUrl){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!isAuthorized()){
          return true;
        }
        else{
          var route = ""; 
          route = this.serviceUrl.getCurrent();
          for( var i = 0; i < route.length; i++)
          {
            if (route[i] === "?") /// if we have params
            {
              this.router.navigate([route.slice(0,i)], 
              {
                queryParams :  this.serviceUrl.getParams() /// get previous params
              });
              return false;
            }
          }
          this.router.navigate([route]);  ///else navigate to path
          return false
        }
    }
}

@Injectable()
export class CanReserveGuard implements CanActivate {
  constructor(private router : Router, private snacker: MatSnackBar){}

  duration_for_snacker = 5;
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (isAuthorized()){
          return true;
        }
        else{
          //this.router.navigate(['login']);
          this.snacker.open("Denied. You should login","OK",{
            duration: this.duration_for_snacker * 1000
          });
          return false
        }
    }
}

