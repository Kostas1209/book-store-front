import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { HttpService } from '../services/server.service';
import { UserComponent } from "./user.component";

@NgModule({
    declarations: [ UserComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
      ],
    providers: [HttpService],
    exports: [ UserComponent]
})
export class UserModule
{}