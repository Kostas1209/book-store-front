
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrModule } from './registr/registr.module';
import { LoginModule } from "./login/login.module";
import { BookModule } from "./books/books.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LoginModule,
    RegistrModule,
    BookModule,
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
