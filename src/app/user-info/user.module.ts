//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { UserComponent } from "./user.component";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from '../services/pipes';

@NgModule({
    declarations: [ UserComponent, SafeHtmlPipe],
    imports: [
        //BrowserModule,
        //HttpClientModule,
        CommonModule,
        FormsModule
      ],
    exports: [ UserComponent]
})
export class UserModule
{}