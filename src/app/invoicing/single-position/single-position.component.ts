import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InvoiceItem, Unit, Tax } from '../model/item';
import { PriceCalculator, ItemPrice } from '../model/price-calculation/price-calculator';

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

  constructor(
    private priceCalculator: PriceCalculator
  ) {}

  ngOnInit() {
    this.position = {
      ...this.position,
      tax: Tax.t23
    };
  }

  removePosition(): void {
    this.itemRemoved.next(this.position);
  }

  handleChangeNetto(): void {
    const res = this.priceCalculator.calculate({
      netto: this.position.netto,
      gross: null,
      tax: this.position.tax
    });

    this.updateAccordingToResult(res);
  }

  handleChangeBrutto(): void {
    const res = this.priceCalculator.calculate({
      netto: null,
      gross: this.position.brutto,
      tax: this.position.tax
    });

    this.updateAccordingToResult(res);
  }

  handleChangeTax(): void {
    const res = this.priceCalculator.calculate({
      netto: this.position.netto,
      gross: this.position.brutto,
      tax: this.position.tax
    });

    this.updateAccordingToResult(res);
  }

  private updateAccordingToResult(res: ItemPrice) {
    this.position = {
      ...this.position,
      brutto: res.gross,
      netto: res.net
    };
  }
}
