//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReserveBookComponent} from './reserve-book.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ReserveBookComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    //BrowserModule,
    //HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [ReserveBookComponent]
})
export class ReserveBookModule { }