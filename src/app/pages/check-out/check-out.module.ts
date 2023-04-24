import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CheckOutComponent],
  imports: [
    CommonModule,
    CheckOutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [CheckOutComponent]
})
export class CheckOutModule {}
