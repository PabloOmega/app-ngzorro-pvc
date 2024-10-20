import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSB } from '../types/productsSB';

@Injectable({
  providedIn: 'root'
})
export class ProductsSBService {
  url: string = 'http://localhost:8080/api/productos';
  products: ProductSB[] = [];

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductSB[]>{
    return this.httpClient.get<ProductSB[]>(this.url);
  }

  getProduct(id: string): Observable<ProductSB>{
    return this.httpClient.get<ProductSB>(`${this.url}/${id}`);
  }

  createProduct(product: ProductSB): Observable<ProductSB>{
    return this.httpClient.post<ProductSB>(this.url, product);
  }

  updateProduct(product: ProductSB): Observable<ProductSB>{
    return this.httpClient.put<ProductSB>(`${this.url}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<any>{
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
