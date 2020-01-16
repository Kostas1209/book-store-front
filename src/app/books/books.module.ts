//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BookComponent } from "./books.component";
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

// const routes: Routes = [{ path: '', component: BookComponent }];

@NgModule({
    declarations: [ BookComponent
      ],
    imports: [
        //BrowserModule,
        //HttpClientModule,
        CommonModule,
        FormsModule
      ],
    exports: [ BookComponent]
})
export class BookModule
{}