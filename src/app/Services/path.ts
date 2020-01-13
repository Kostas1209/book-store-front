import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ServiceUrl {

    previousUrl: string;
    currentUrl: string; 

    constructor(router: Router) {
        console.log("test");
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {     
              this.previousUrl = this.currentUrl;
              this.currentUrl = event.url;
              console.log(this.previousUrl,this.currentUrl) 
            };
          });
    }
}