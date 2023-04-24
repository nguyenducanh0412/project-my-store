import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'product-detail',
    loadChildren: () =>
      import('./pages/product-detail/product-detail.module').then(
        (m) => m.ProductDetailModule
      ),
  },
  {
    path: 'my-cart',
    loadChildren: () =>
      import('./pages/my-cart/my-cart.module').then((m) => m.MyCartModule),
  },
  {
    path: 'check-out',
    loadChildren: () =>
      import('./pages/check-out/check-out.module').then(
        (m) => m.CheckOutModule
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./layout/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'confirmation',
    loadChildren: () =>
      import('./pages/confirmation/confirmation.module').then(
        (m) => m.ConfirmationModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./layout/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
