import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicePositionsComponent } from './invoice-positions/invoice-positions.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SinglePositionComponent } from './single-position/single-position.component';
import { PriceCalculator } from './model/price-calculation/price-calculator';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ItemCatalog } from './model/item-catalog/item-catalog';
import { HttpItemCatalog } from './model/item-catalog/http-item-catalog';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';
import {MatNativeDateModule, MatDatepickerModule,MatFormFieldModule,MatInputModule } from "@angular/material";

@NgModule({
  declarations: [InvoicePositionsComponent, InvoiceComponent, SinglePositionComponent, InvoiceSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  exports: [InvoiceComponent],
  providers: [
    {
      provide: PriceCalculator, useFactory: () => new PriceCalculator()
    },
    // {
    //   provide: ItemCatalog, useFactory: () => new LocalItemCatalog()
    // }
    {
      provide: ItemCatalog, useFactory: (http: HttpClient) => new HttpItemCatalog(http), deps: [HttpClient]
    }
  ]
})
export class InvoicingModule { }
