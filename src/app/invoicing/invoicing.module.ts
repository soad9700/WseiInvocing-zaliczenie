import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoicePositionsComponent } from './invoice-positions/invoice-positions.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SinglePositionComponent } from './single-position/single-position.component';
import { PriceCalculator } from './model/price-calculation/price-calculator';
import { HttpClientModule } from '@angular/common/http';
import { ItemCatalog } from './model/item-catalog/item-catalog';
import { LocalItemCatalog } from './model/item-catalog/local-item-catalog';

@NgModule({
  declarations: [InvoicePositionsComponent, InvoiceComponent, SinglePositionComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [InvoiceComponent],
  providers: [
    {
      provide: PriceCalculator, useFactory: () => new PriceCalculator()
    },
    {
      provide: ItemCatalog, useFactory: () => new LocalItemCatalog()
    }
  ]
})
export class InvoicingModule { }
