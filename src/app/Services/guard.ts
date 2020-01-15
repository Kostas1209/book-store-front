import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { isAuthorized } from './cookie.service';
import { ServiceUrl } from './path.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private serviceUrl : ServiceUrl){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!isAuthorized()){
          return true;
        }
        else{
          var route = "a"; 
          route = this.serviceUrl.getCurrent();
          for( var i = 0; i < route.length; i++)
          {
            if (route[i] === "?")
            {
               for (var j = i+1;j < route.length; j++)
               {
                 if(route[j] === '=')
                 {
                   var id = route.slice(i+1,j);  /// name of param 
                   this.router.navigate(
                    [route.slice(0,i)], /// route
                    {
                    queryParams:{
                      id : route.slice(j+1,route.length), /// "id" : number
                      }
                    }
                    )
                  return false;
                 }
               }
            }
          }
          this.router.navigate([route]);
          return false
        }
    }
}