import { Component, OnInit } from '@angular/core';
import { InvoiceItem } from '../model/item';

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.scss']
})
export class InvoicePositionsComponent implements OnInit {
  private positions: InvoiceItem[] = [];

  constructor() { }

  ngOnInit() {
    this.positions.push({});
    this.positions.push({});
  }

  addPosition(): void {
    this.positions.push({});
  }

  removePosition(position: InvoiceItem): void {
    this.positions = this.positions.filter(p => p !== position);
  }
}
