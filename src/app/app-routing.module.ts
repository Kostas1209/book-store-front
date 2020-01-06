import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrComponent } from './registr/registr.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './books/books.component';
import { UserComponent } from './user-info/user.component';
import { UserBooksComponent} from './user-interface/user-books/user-books.component'
import { ReserveBookComponent } from './reserve-book/reserve-book.component';

const routes: Routes = [
  { path: 'registration', component: RegistrComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookComponent },
  { path: 'user', component: UserComponent },
  { path: 'user_basket', component: UserBooksComponent },
  { path: 'single_book', component: ReserveBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
