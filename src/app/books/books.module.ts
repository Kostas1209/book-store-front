import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BookComponent } from "./books.component";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [ BookComponent
      ],
    imports: [
        BrowserModule,
        HttpClientModule
      ],
    exports: [ BookComponent]
})
export class BookModule
{}