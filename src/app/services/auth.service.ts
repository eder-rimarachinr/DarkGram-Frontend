import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { signIn, signUp } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: signUp): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/signup`, user)
  }

  signIn(user: signIn): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/signin`, user)
  }

  loggedIn(): boolean {
    return !!window.localStorage.getItem('token')
  }

  getToken(): any {
    return window.localStorage.getItem('token');
  }

  getUserID():any{
    return window.localStorage.getItem('user');
  }

  logOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    // this.router.navigate(['/signin'])
  }

}
