import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../types/product';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NzTableModule, 
    NzButtonModule, 
    NzInputModule, 
    NzPopconfirmModule, 
    FormsModule,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  editCache: { [key: string]: { edit: boolean; data: Product } } = {};
  products: Product[] = [];
  role: string = "";

  constructor(private productsService: ProductsService, private usersService: UsersService) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem("user")!) as User;

    this.getProducts();
    this.getUserRole(currentUser.uid);
  }

  private getProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.updateEditCache();
    })
  }

  private getUserRole(uid: string){
    this.usersService.getUser(uid)
      .then(queryResponse => {
        this.role = (queryResponse.docs[0].data() as User).role!;
        console.log(this.role);
      })
  }

  addProduct(): void {
    this.productsService.createProduct({
      "name": "Nuevo Producto",
      "description": "Nueva Descripción",
      "price": 10,
      "image": "",
    })
      .then(() => console.log("Producto agregado"))
      .catch(err => console.log(err));
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }
  
  cancelEdit(id: string): void {
    const index = this.products.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.products[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    this.productsService.updateProduct(this.editCache[id].data)
      .then(() => {
        const index = this.products.findIndex(item => item.id === id);
        Object.assign(this.products[index], this.editCache[id].data);
        this.editCache[id].edit = false;
      })
      .catch(err => console.log(err));
  }

  updateEditCache(): void {
    this.products.forEach(product => {
      this.editCache[product.id!] = {
        edit: false,
        data: { ...product }
      };
    });
  }
  
  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id)
      .then(() => {
        this.products = this.products.filter(item => item.id !== id);
      })
      .catch(err => console.log(err));
  }
}
