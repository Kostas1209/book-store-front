//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { UserComponent } from "./user.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [ UserComponent],
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