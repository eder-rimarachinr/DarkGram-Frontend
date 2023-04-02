import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products`)
  }

  getAllProductsByUser(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products/${this.authService.getUserID()}`)
  }
}
