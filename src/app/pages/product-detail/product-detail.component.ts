import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MESSAGE, renderMessage } from 'src/app/helpers';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.productService
        .getProductById(Number(params.get('id')))
        .subscribe((result: IProduct) => {
          this.product = result;
        });
    });
  }
  handleAddItemToCart(product: IProduct): void {
    const { name } = product;
    this.productService.addItemToCart(product);
    alert(renderMessage(name, MESSAGE.ADD));
  }
}
