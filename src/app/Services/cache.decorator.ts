import { race, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';



export interface CacheOptions {
  ttl: number;
}

export function Cache(options: CacheOptions) {


  return (target: any, propertyKey: string, descriptor) => {
    
    const originalFunction = descriptor.value;
    target[`${propertyKey}_cached`] = new ReplaySubject(1, options.ttl);

    
    descriptor.value = function(...args) {

      let req;
      //localStorage.removeItem(`${propertyKey}_cached`);

      if  (localStorage.getItem(`${propertyKey}_cached`))  /// if we have data for this function in cache
      {
        console.log(`${propertyKey} are get from localstorage`);
        const result = localStorage.getItem(`${propertyKey}_cached`);
        //console.log(result);
        if (propertyKey === "getUserAvatar")
          req = this[`${propertyKey}_cached`].next(result.slice(1,result.length-1)); /// remove " from begin and end of string image   
        else{
          req = this[`${propertyKey}_cached`].next(result);
        }
      }
      else{
        console.log(`${propertyKey} are get from server`);
          req = originalFunction.apply(this, args).pipe(
          tap((response) => {
            localStorage.setItem(`${propertyKey}_cached`,JSON.stringify(response)); /// save to local storage 
            this[`${propertyKey}_cached`].next(response);
          })
        );
      }

      return race(this[`${propertyKey}_cached`], req);

    }
    return descriptor;
  };
}