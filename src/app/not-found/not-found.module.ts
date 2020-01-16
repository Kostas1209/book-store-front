//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    //BrowserModule,
    CommonModule
  ],
  exports: [ NotFoundComponent]
})
export class NotFoundModule { }