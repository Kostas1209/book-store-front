import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { isAuthorized } from './cookie';
import { ServiceUrl } from './path';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private serviceUrl : ServiceUrl){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!isAuthorized()){
          return true;
        }
        else{
          console.log(this.serviceUrl.previousUrl, this.serviceUrl.currentUrl);
          this.router.navigate([this.serviceUrl.previousUrl]);
          return false
        }
    }
}