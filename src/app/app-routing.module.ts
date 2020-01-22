import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, CanReserveGuard, } from './services/guard';


const routes: Routes = [
  { path: 'registration', loadChildren: () => import('./registr/registr.module').then(m => m.RegistrModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [AuthGuard] },
  //{ path: 'books', component: BookComponent },
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BookModule) },
  { path: 'user', loadChildren: () => import('./user-info/user.module').then(m => m.UserModule) },
  { path: 'single_book', loadChildren: () => import('./reserve-book/reserve-book.module').then(m => m.ReserveBookModule), canActivate : [CanReserveGuard] },
  { path: '**',/* loadChildren: () => import('./not-found/not-found.module').then(m=>m.NotFoundModule),*/ redirectTo: 'books' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


