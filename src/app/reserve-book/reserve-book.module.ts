import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReserveBookComponent} from './reserve-book.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../services/server.service'

@NgModule({
  declarations: [
    ReserveBookComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService],
  exports: [ReserveBookComponent]
})
export class ReserveBookModule { }