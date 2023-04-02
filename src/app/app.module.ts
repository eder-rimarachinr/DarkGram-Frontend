import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsComponent } from './components/products/products.component';
import { PrivateProductsComponent } from './components/private-products/private-products.component';
import { AuthGuard } from './Guard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HttpErrorService } from './services/http-error.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ProductsComponent,
    PrivateProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
