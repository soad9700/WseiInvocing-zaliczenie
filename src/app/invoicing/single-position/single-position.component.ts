import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InvoiceItem, Unit, Tax } from '../model/item';

@Component({
  selector: 'app-single-position',
  templateUrl: './single-position.component.html',
  styleUrls: ['./single-position.component.scss']
})
export class SinglePositionComponent implements OnInit {

  @Input()
  private position: InvoiceItem;
  @Input()
  private lp: number;

  private availableUnits: Unit[] = [
    Unit.good,
    Unit.hour,
    Unit.service
  ];

  private availableTaxes: Tax[] = [
    Tax.t23,
    Tax.t8,
    Tax.t5
  ];

  @Output()
  private itemRemoved: EventEmitter<InvoiceItem> = new EventEmitter<InvoiceItem>();

  constructor() { }

  ngOnInit() {
  }

  removePosition(): void {
    this.itemRemoved.next(this.position);
  }
}
