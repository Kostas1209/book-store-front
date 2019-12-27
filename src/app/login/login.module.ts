import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from "./login.component";

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [ LoginComponent
      ],
    imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
    exports: [ LoginComponent]
})
export class LoginModule
{}