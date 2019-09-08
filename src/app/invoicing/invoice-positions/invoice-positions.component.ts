import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvoiceItem, InvoiceItemFactory, InvoiceData } from "../model/item";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-invoice-positions",
  templateUrl: "./invoice-positions.component.html",
  styleUrls: ["./invoice-positions.component.scss"]
})
export class InvoicePositionsComponent implements OnInit {


  public invoiceForm = new FormGroup({
    firstName: new FormControl(''),
    firstAddress: new FormControl(''),
    firstNIP: new FormControl(0),
    secondName: new FormControl(''),
    secondAddress: new FormControl(''),
    secondNIP: new FormControl(0)
  });


  @Input()
  private positions: InvoiceItem[] = new Array<InvoiceItem>();

  @Output()
  itemsChanged: EventEmitter<InvoiceItem[]> = new EventEmitter();

  private invoiceItemFactory: InvoiceItemFactory;
  private invoiceData = {} as InvoiceData;

  constructor() {
    this.invoiceItemFactory = new InvoiceItemFactory();
  }

  ngOnInit() {for (let i = 0; i < localStorage.length; i++) {
    const test = JSON.parse(
      localStorage.getItem(localStorage.key(i))
    ) as InvoiceItem;
    if (test) {
      this.positions.push(test);
    }
    console.log(this.positions);
  }}

  addPosition(): void {
    this.positions.push(this.invoiceItemFactory.newInvoiceItem());
    this.itemsChanged.next(this.positions);
  }

  removePosition(position: InvoiceItem): void {
    this.positions = this.positions.filter(p => p.id !== position.id);
    this.itemsChanged.next(this.positions);
  }

  handlePositionChanged(positon: InvoiceItem): void {
    this.itemsChanged.next(this.positions);
  }

  savePositions() {
    this.invoiceData.firstName = this.invoiceForm['firstName'];
    this.invoiceData.firstAddress = this.invoiceForm['firstAddress'];
    this.invoiceData.firstNIP = this.invoiceForm['firstNIP'];
    this.invoiceData.secondName = this.invoiceForm['secondName'];
    this.invoiceData.secondAddress = this.invoiceForm['secondAddress'];
    this.invoiceData.secondNIP = this.invoiceForm['secondNIP'];
    let iterator = 1;
    this.positions.forEach(invoiceItem => {
      localStorage.setItem(
        "invoiceItem" + iterator.toString(),
        JSON.stringify(invoiceItem)
      );
      iterator++;
    });
    localStorage.setItem(
      "invoiceData",
      JSON.stringify(this.invoiceData)
    );
    alert('Do you want to save your invoice?');
  }
}
