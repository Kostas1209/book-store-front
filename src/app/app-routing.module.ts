// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// //import { RegistrComponent } from './registr/registr.component';
// //import { LoginComponent } from './login/login.component';
// //import { BookComponent } from './books/books.component';
// //import { UserComponent } from './user-info/user.component';
// //import { ReserveBookComponent } from './reserve-book/reserve-book.component';
// import { AuthGuard, CanReserveGuard, } from './services/guard';
// //import { NotFoundComponent } from './not-found/not-found.component';

// const routes: Routes = [
//   { path: 'registration', loadChildren: () => import('./registr/registr.module').then(m => m.RegistrModule), canActivate: [AuthGuard] },
//   { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
//   { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BookModule)},
//   { path: 'user', loadChildren: () => import('./user-info/user.module').then(m => m.UserModule)},
//   { path: 'single_book', loadChildren: () => import('./reserve-book/reserve-book.module').then(m => m.ReserveBookModule), canActivate : [ CanReserveGuard]},
//   { path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)},
// ];
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrComponent } from './registr/registr.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './books/books.component';
import { UserComponent } from './user-info/user.component';
import { ReserveBookComponent } from './reserve-book/reserve-book.component';
import { AuthGuard, CanReserveGuard } from './services/guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'registration', component: RegistrComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BookComponent },
  { path: 'user', component: UserComponent },
  { path: 'single_book', component: ReserveBookComponent , canActivate : [ CanReserveGuard]},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


