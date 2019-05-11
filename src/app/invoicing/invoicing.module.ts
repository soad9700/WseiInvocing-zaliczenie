import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicePositionsComponent } from './invoice-positions/invoice-positions.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [InvoicePositionsComponent, InvoiceComponent],
  imports: [
    CommonModule
  ],
  exports: [InvoiceComponent]
})
export class InvoicingModule { }
