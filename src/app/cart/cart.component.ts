import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { CartService } from './services/products.service';
import { ProductCart } from './services/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,DataViewModule,CardModule],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private cartService: CartService) {}

  products : ProductCart[] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  ngOnInit() {
    this.cartService.cartProducts$.subscribe((products) => {
      this.products = [...products];
      this.calculTotal();
    });
  }

  onDelete(product:ProductCart){
    this.cartService.removeProduct(product.product);
  }


  removeOne(product:ProductCart){
    product.quantity = Math.max(product.quantity - 1,1);
    this.calculTotal();
  }

  addOne(product:ProductCart){
    this.cartService.addProduct(product.product)
  }

  private calculTotal(){

    this.totalPrice = this.products.reduce((total, currentproduct) =>
    total + currentproduct.quantity * currentproduct.product.price, 0);

    this.totalQuantity = this.products.reduce((total, currentproduct) =>
      total + currentproduct.quantity, 0);


  }
}
