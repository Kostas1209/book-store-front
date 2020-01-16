
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './material.module';
import { AuthGuard, CanReserveGuard } from './services/guard';
import { ServiceUrl } from './services/path.service';
import { NotFoundModule } from './not-found/not-found.module';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { UserBasketService } from './services/server.service';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [
    AppComponent,
    UserInterfaceComponent,
    LoaderComponent,
  ],
  imports: [
    HttpClientModule,
    UserInterfaceModule,
    UserModule,
    LoginModule,
    RegistrModule,
    BookModule,
    BrowserModule,
    BrowserAnimationsModule ,
    AppRoutingModule,
    ReserveBookModule,
    MaterialAppModule,
    NotFoundModule,
    CommonModule
    
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ParamInterceptor,
    multi: true
  },
  AuthGuard,
  CanReserveGuard,
  ServiceUrl,
  LoaderService,
  UserBasketService,
  UserService,
  BookService
],
})
export class AppModule { }
