//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BookComponent } from "./books.component";
import { FormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../sharing.module';

// const routes: Routes = [{ path: '', component: BookComponent }];

@NgModule({
    declarations: [BookComponent],
    imports: [
        //BrowserModule,
        //HttpClientModule,
        BookRoutingModule,
        FormsModule,
        SharedModule,
      ],
})
export class BookModule
{}