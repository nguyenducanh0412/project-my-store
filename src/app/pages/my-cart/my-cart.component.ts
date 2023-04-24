import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE, renderMessage } from 'src/app/helpers';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  products: IProduct[] = [];
  cartProducts: IProduct[] = [];
  totalPrice: number = 0;

  constructor(private productService: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.getItemInCart();
    this.calculatePrice();
  }

  getItemInCart(): void {
    this.cartProducts = this.productService.getItemInCart();
  }

  onSelectChange(productCart: IProduct, event: string): void {
    const cartIdx = this.cartProducts.findIndex(
      (cart) => cart.id === productCart.id
    );
    if (cartIdx != -1 && this.cartProducts.length > 0) {
      this.cartProducts[cartIdx].quantity = Number(event);
    }
    if (this.cartProducts.length > 0) {
      this.productService.updateItemInCart(this.cartProducts);
    }
    this.calculatePrice();
  }

  removeCart(productCart: IProduct): void {
    this.productService.removeItemInCart(productCart.id);
    this.getItemInCart();
    this.calculatePrice();
    alert(renderMessage(productCart.name, MESSAGE.REMOVE));
  }

  calculatePrice(): void {
    this.totalPrice = Number(
      this.cartProducts
        .reduce((pre: number, curr: IProduct) => {
          return pre + curr.price * Number(curr.quantity);
        }, 0)
        .toFixed(2)
    );
  }

  handleCheckoutItemInCart(name: any): void {
    this.productService.clearAllCart();
    this.route.navigateByUrl(`confirmation/${name}/${this.totalPrice}`);
  }
}
