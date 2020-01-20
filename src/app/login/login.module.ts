//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
//import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        FormsModule,
        CommonModule,
       // BrowserModule,
        ReactiveFormsModule,
        LoginRoutingModule
       // HttpClientModule
      ],
    exports: [LoginComponent]
})
export class LoginModule
{}