//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    //BrowserModule,
    NotFoundRoutingModule,
    CommonModule
  ],
})
export class NotFoundModule { }