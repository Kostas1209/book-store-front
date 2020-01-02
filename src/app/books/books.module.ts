import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BookComponent } from "./books.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ BookComponent
      ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
      ],
    exports: [ BookComponent]
})
export class BookModule
{}