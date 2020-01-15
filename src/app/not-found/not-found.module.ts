import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [ NotFoundComponent]
})
export class NotFoundModule { }