
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrModule } from './registr/registr.module';
import { LoginModule } from "./login/login.module";
import { BookModule } from "./books/books.module";
import { UserModule } from './user-info/user.module';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { UserInterfaceModule } from './user-interface/user-interface.module';
import { ReserveBookModule } from './reserve-book/reserve-book.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParamInterceptor } from './services/interseptor';

@NgModule({
  declarations: [
    AppComponent,
    UserInterfaceComponent
  ],
  imports: [
    UserInterfaceModule,
    UserModule,
    LoginModule,
    RegistrModule,
    BookModule,
    BrowserModule,
    AppRoutingModule,
    ReserveBookModule,
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ParamInterceptor,
    multi: true
  },],
})
export class AppModule { }
