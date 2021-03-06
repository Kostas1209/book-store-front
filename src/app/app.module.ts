
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { UserInterfaceModule } from './user-interface/user-interface.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParamInterceptor } from './services/interseptor';
import { MaterialAppModule } from './material.module';
import { AuthGuard, CanReserveGuard } from './services/guard';
import { ServiceUrl } from './services/path.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { UserBasketService } from './services/user-basket.service';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UserInterfaceComponent,
    LoaderComponent,
  ],
  imports: [
    HttpClientModule,
    UserInterfaceModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MaterialAppModule,
    CommonModule,
    BrowserAnimationsModule
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
  BookService,
],
})
export class AppModule { }
