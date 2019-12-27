import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RegistrComponent } from './registr.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../Services/Server.Service'

@NgModule({
  declarations: [
    RegistrComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  exports: [ RegistrComponent]
})
export class RegistrModule { }