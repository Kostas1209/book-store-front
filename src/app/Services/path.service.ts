import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ServiceUrl {

    previousUrl: string;
    currentUrl: string; 

    constructor(router: Router) {
        console.log("test");
        router.events
        .subscribe(event => {
            if (event instanceof NavigationEnd) {   
              localStorage.setItem('prevUrl',localStorage.getItem('currentUrl'));
              localStorage.setItem('currentUrl',event.url);
              this.Show();
            };
          });
    }

    getPrev()
    {
      return localStorage.getItem('prevUrl');
    }

    Show()
    {
      console.log(this.getCurrent() + "    " + this.getPrev());
    }

    getCurrent()
    {
      return localStorage.getItem('currentUrl');
    }
}