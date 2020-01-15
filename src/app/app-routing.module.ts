import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrComponent } from './registr/registr.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './books/books.component';
import { UserComponent } from './user-info/user.component';
import { ReserveBookComponent } from './reserve-book/reserve-book.component';
import { AuthGuard } from './services/guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'registration', component: RegistrComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BookComponent },
  { path: 'user', component: UserComponent },
  { path: 'single_book', component: ReserveBookComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
