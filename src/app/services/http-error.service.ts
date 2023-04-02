import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService implements HttpInterceptor {

  constructor(
    private authServices: AuthService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          console.error('Error 500: Internal Server Error');
          this.authServices.logOut();
        }
        if (error.status === 401) {
          console.error('No authorized');
          this.authServices.logOut();
        }

        if (error.status === 404) {
          console.error('Not Found');
          this.authServices.logOut();
        }

        if (error.status === 400) {
          console.error('Bad Request');
          this.authServices.logOut();
        }
        this.router.navigate(['/signin'])
        return throwError(error);
      })
    );
  }
}