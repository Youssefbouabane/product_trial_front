import { Injectable} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "app/products/data-access/product.model";
import { ProductCart } from "./product.model";

@Injectable({
    providedIn: "root"
}) export class CartService {

  private cartProducts = new BehaviorSubject<ProductCart[]>([]);
  cartProducts$ = this.cartProducts.asObservable();

  addProduct(product: Product) {
    const currentProducts = this.cartProducts.value;
    const productIndex = currentProducts.findIndex(p => p.id === product.id);

    if (productIndex > -1) {
      currentProducts[productIndex].quantity += 1;
    } else {
      let productCart : ProductCart = {
        id : product.id,
        product : product,
        quantity : 1
      }
      currentProducts.push(productCart);
    }

    this.cartProducts.next(currentProducts);
  }

  removeProduct(product : Product){
    const currentProducts = this.cartProducts.value;
    const productIndex = currentProducts.findIndex(p => p.id === product.id);
    if (productIndex > -1) {
      currentProducts.splice(productIndex,1);
      this.cartProducts.next(currentProducts);
    }

  }

  getCartProducts() {
    return this.cartProducts.value;
  }

  clearCart() {
    this.cartProducts.next([]);
  }


}
