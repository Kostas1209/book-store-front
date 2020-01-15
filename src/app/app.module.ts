
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './material.module';
import { AuthGuard } from './services/guard';
import { ServiceUrl } from './services/path.service';
import { NotFoundModule } from './not-found/not-found.module';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';


@NgModule({
  declarations: [
    AppComponent,
    UserInterfaceComponent,
    LoaderComponent,
  ],
  imports: [
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
    
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ParamInterceptor,
    multi: true
  },
  AuthGuard,
  ServiceUrl,
  LoaderService],
})
export class AppModule { }
