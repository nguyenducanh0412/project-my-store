import { Component, OnInit } from '@angular/core';
import { MESSAGE, renderMessage } from 'src/app/helpers';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getListProduct();
  }

  getListProduct(): void {
    this.productService.getListProduct().subscribe((res: IProduct[]) => {
      this.products = res;
    });
  }

  handleAddItemToCart(product: IProduct): void {
    const { name } = product;
    this.productService.addItemToCart(product);
    this.getListProduct();
    alert(renderMessage(name, MESSAGE.ADD));
  }
}
