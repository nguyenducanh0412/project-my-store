import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCartRoutingModule } from './my-cart-routing.module';
import { MyCartComponent } from './my-cart.component';
import { FormsModule } from '@angular/forms';
import { CheckOutModule } from '../check-out/check-out.module';

@NgModule({
  declarations: [MyCartComponent],
  imports: [CommonModule, MyCartRoutingModule, FormsModule, CheckOutModule],
})
export class MyCartModule {}
