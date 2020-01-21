//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReserveBookComponent} from './reserve-book.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { ReserveBookRoutingModule } from './reserve-book-routing';
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
    ReserveBookRoutingModule,
  ],
})
export class ReserveBookModule { }