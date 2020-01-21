//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RegistrComponent } from './registr.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
//import { HttpService } from '../services/server.service'
import { CommonModule } from '@angular/common';
import { RegistrRoutingModule } from './registr-routing.module';

@NgModule({
  declarations: [
    RegistrComponent
  ],
  imports: [
    FormsModule,
    //BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    RegistrRoutingModule,
    //HttpClientModule
  ],
})
export class RegistrModule { }