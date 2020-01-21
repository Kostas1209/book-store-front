import { Injectable } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute, NavigationExtras, Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ServiceUrl {

    constructor(router: Router, private activateRouter : ActivatedRoute) {
        router.events
        .subscribe(event => {
            if (event instanceof NavigationEnd) {   
              let result:Params;
              this.activateRouter.queryParams.subscribe(
                params => result = params
              );  
              localStorage.setItem('currentUrl',router.url);
              localStorage.setItem('params',JSON.stringify(result));
              this.show();
            };
          });
    }

    show()
    {
      console.log(this.getCurrent());
      console.log(this.getParams());
    }

    getParams()
    {
      const storageVal = localStorage.getItem('params');
      const val = JSON.parse(storageVal)
      return val;
    }

    getCurrent()
    {
      return localStorage.getItem('currentUrl');
    }
}