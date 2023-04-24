import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/iproduct';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MY_CART } from '../helpers/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private defaultQuantity: number = 1;
  private MAX_QUANTITY: number = 5;
  private urlFileData: string = './assets/data.json';

  constructor(private _http: HttpClient) {}

  getListProduct(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this.urlFileData).pipe(
      map((v: IProduct[]) => {
        return v.map((item: IProduct) => ({
          ...item,
          quantity: this.defaultQuantity,
        }));
      })
    );
  }

  getProductById(id: number): Observable<any> {
    return this._http.get<IProduct[]>(this.urlFileData).pipe(
      map((v: IProduct[]) => {
        return v
          .map((item: IProduct) => ({
            ...item,
            quantity: this.defaultQuantity,
          }))
          .find((item: IProduct) => item.id === id);
      })
    );
  }

  addItemToCart(product: IProduct): void {
    let newCart: IProduct[] = [];
    const cartProducts: any = this.getItemInCart();
    const cartIdx = cartProducts.findIndex(
      (cart: IProduct) => cart.id === product.id
    );
    newCart = [...cartProducts];
    if (cartIdx === -1 || cartProducts.length === 0) {
      newCart.push({ ...product, quantity: product.quantity });
    } else {
      // check quantity when total > max quantity
      newCart[cartIdx].id = product.id;
      newCart[cartIdx].quantity =
        newCart[cartIdx].quantity + product.quantity > this.MAX_QUANTITY
          ? this.MAX_QUANTITY
          : newCart[cartIdx].quantity + product.quantity;
    }
    this.updateItemInCart(newCart);
  }

  removeItemInCart(productId: number): void {
    const cartProducts: IProduct[] = this.getItemInCart();
    this.updateItemInCart(
      cartProducts.filter(
        (cartProduct: IProduct) => cartProduct.id !== productId
      )
    );
  }

  updateItemInCart(product: IProduct[]): void {
    window.localStorage.setItem(MY_CART, JSON.stringify(product));
  }

  getItemInCart(): IProduct[] {
    const hasProduct = window.localStorage.getItem(MY_CART);
    return hasProduct ? JSON.parse(hasProduct) : [];
  }

  clearAllCart(): void {
    window.localStorage.clear();
  }
}
