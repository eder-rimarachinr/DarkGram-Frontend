import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { PrivateProductsComponent } from './components/private-products/private-products.component';
import { ProductsComponent } from './components/products/products.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'private', component: PrivateProductsComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
