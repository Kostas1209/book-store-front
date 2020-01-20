import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { RegistrComponent } from './registr/registr.component';
//import { LoginComponent } from './login/login.component';
//import { BookComponent } from './books/books.component';
//import { UserComponent } from './user-info/user.component';
//import { ReserveBookComponent } from './reserve-book/reserve-book.component';
import { AuthGuard, CanReserveGuard, } from './services/guard';
//import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'registration', loadChildren: './registr/registr.module#RegistrModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [AuthGuard] },
  { path: 'books', loadChildren: './books/books.module#BookModule' },
  { path: 'user', loadChildren: './user-info/user.module#UserModule' },
  { path: 'single_book', loadChildren: './reserve-book/reserve-book.module#ReserveBookModule', canActivate : [CanReserveGuard] },
  { path: '**', loadChildren: './not-found/not-found.module#NotFoundModule' },
];
// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { RegistrComponent } from './registr/registr.component';
// import { LoginComponent } from './login/login.component';
// import { BookComponent } from './books/books.component';
// import { UserComponent } from './user-info/user.component';
// import { ReserveBookComponent } from './reserve-book/reserve-book.component';
// import { AuthGuard, CanReserveGuard } from './services/guard';
// import { NotFoundComponent } from './not-found/not-found.component';

// const routes: Routes = [
//   { path: 'registration', component: RegistrComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
//   { path: 'books', component: BookComponent },
//   { path: 'user', component: UserComponent },
//   { path: 'single_book', component: ReserveBookComponent , canActivate : [ CanReserveGuard]},
//   { path: '**', component: NotFoundComponent},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


