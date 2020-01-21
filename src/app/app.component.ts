import { Component, DoCheck} from '@angular/core';
import { getToken, isAuthorized } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements DoCheck {
  title = 'book-store-frontend';
  isAuthorized: boolean ;

  constructor(){
    this.isAuthorized = false;
  }
  
  ngDoCheck(){
    this.isAuthorized = isAuthorized();
  }
}
