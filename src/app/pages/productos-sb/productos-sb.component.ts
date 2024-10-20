import { Component } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableModule, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ProductSB } from '../../types/productsSB';
import { ProductsSBService } from '../../services/products-sb.service';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CommonModule } from '@angular/common';

type ColumnItem = {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ProductSB> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ProductSB> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-productos-sb',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './productos-sb.component.html',
  styleUrl: './productos-sb.component.css'
})
export class ProductosSBComponent {
  listOfColumns: ColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: ProductSB, b: ProductSB) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: ProductSB) => list.some(nombre => item.nombre.indexOf(nombre) !== -1)
    },
    {
      name: 'Descripción',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Precio',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ProductSB, b: ProductSB) => a.precio - b.precio,
      filterMultiple: false,
      listOfFilter: [
        // { text: 'London', value: 'London' },
        // { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: null
    },
    {
      name: 'Acción',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },    
  ];

  products: ProductSB[] = [];
  editCache: { [key: string]: { edit: boolean; data: ProductSB } } = {};

  constructor(private productsService: ProductsSBService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.updateEditCache();
      this.listOfColumns[0].listOfFilter = [];
      for(let product of this.products){
        if(this.listOfColumns[0].listOfFilter.findIndex(x => x.value == product.nombre) != -1)
          continue;
        this.listOfColumns[0].listOfFilter.push({text: product.nombre, value: product.nombre});
      }
      console.log(this.listOfColumns[0].listOfFilter);
    })
  }

  addProduct(): void {
    this.productsService.createProduct({
      "nombre": "Nuevo Producto",
      "descripcion": "Nueva Descripción",
      "precio": 10,
    }).subscribe(product => {
      this.getProducts();
      console.log(product);
      //this.products.push(product);
      //this.updateEditCache();
    });
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
      .subscribe(() => {
        this.getProducts();
        const index = this.products.findIndex(item => item.id === id);
        Object.assign(this.products[index], this.editCache[id].data);
        this.editCache[id].edit = false;
      });
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
      .subscribe(() => {
        this.getProducts();
        this.products = this.products.filter(item => item.id !== id);
      })
  }
}
