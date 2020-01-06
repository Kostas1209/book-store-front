
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
import { ManagerAddBookComponent } from './manager-add-book/manager-add-book.component';


@NgModule({
  declarations: [
    AppComponent,
    UserInterfaceComponent,
    ManagerAddBookComponent,
  ],
  imports: [
    UserModule,
    LoginModule,
    RegistrModule,
    BookModule,
    BrowserModule,
    AppRoutingModule,
    UserInterfaceModule,
    ReserveBookModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
