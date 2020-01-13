import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { UserComponent } from "./user.component";

@NgModule({
    declarations: [ UserComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
      ],
    exports: [ UserComponent]
})
export class UserModule
{}