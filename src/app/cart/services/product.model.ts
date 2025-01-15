import { Product } from "app/products/data-access/product.model";

export interface ProductCart {
    id: number;
    product : Product;
    quantity : number;
}
