import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: Firestore) { }

  getProducts() : Observable<Product[]> {
    const productsRef = collection(this.firestore, "products");
    return collectionData(productsRef, {idField: "id"}) as Observable<Product[]>;
  }

  createProduct(product: Product): Promise<any> {
    const productsRef = collection(this.firestore, "products");
    return addDoc(productsRef, product);
  }

  updateProduct(product: Product): Promise<any> {
    const newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    }
    const productDoc = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productDoc, newProduct);
  }

  deleteProduct(id: string): Promise<any> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }  
}
