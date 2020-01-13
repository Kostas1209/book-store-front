import { Component, DoCheck} from '@angular/core';
import { getToken } from './Services/cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements DoCheck {
  title = 'book-store-frontend';
  isAuthorized: boolean ;

  constructor(){
    this.isAuthorized = false;
  }
  
  ngDoCheck(){
    if(getToken("refresh") != undefined)
    {
      this.isAuthorized = true;
    }
    else{
      this.isAuthorized = false;
    }
  }
}
