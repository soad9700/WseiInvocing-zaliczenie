import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvoiceItem, InvoiceItemFactory, InvoiceData } from "../model/item";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-invoice-positions",
  templateUrl: "./invoice-positions.component.html",
  styleUrls: ["./invoice-positions.component.scss"]
})
export class InvoicePositionsComponent implements OnInit {
  public invoiceForm = new FormGroup({
    firstName: new FormControl(""),
    firstAddress: new FormControl(""),
    firstNIP: new FormControl(0),
    secondName: new FormControl(""),
    secondAddress: new FormControl(""),
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

  ngOnInit() {
    debugger;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage['invoiceData'] === null) {
        const test = JSON.parse(
          localStorage.getItem(localStorage.key(i))
        ) as InvoiceItem;
        if (test) {
          this.positions.push(test);
        }
      }
    }

    const testData = JSON.parse(
      localStorage.getItem("invoiceData")
    ) as InvoiceData;
    this.invoiceForm.controls["firstName"].setValue(testData.firstName);
    this.invoiceForm.controls["firstAddress"].setValue(testData.firstAddress);
    this.invoiceForm.controls["firstNIP"].setValue(testData.firstNIP);
    this.invoiceForm.controls["secondName"].setValue(testData.secondName);
    this.invoiceForm.controls["secondAddress"].setValue(testData.secondAddress);
    this.invoiceForm.controls["secondNIP"].setValue(testData.secondNIP);
  }

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
    console.log(this.invoiceForm);

    this.invoiceData.firstName = this.invoiceForm.controls["firstName"].value;
    this.invoiceData.firstAddress = this.invoiceForm.controls["firstAddress"].value;
    this.invoiceData.firstNIP = this.invoiceForm.controls["firstNIP"].value;
    this.invoiceData.secondName = this.invoiceForm.controls["secondName"].value;
    this.invoiceData.secondAddress = this.invoiceForm.controls["secondAddress"].value;
    this.invoiceData.secondNIP = this.invoiceForm.controls["secondNIP"].value;
    let iterator = 1;
    this.positions.forEach(invoiceItem => {
      localStorage.setItem(
        "invoiceItem" + iterator.toString(),
        JSON.stringify(invoiceItem)
      );
      iterator++;
    });
    localStorage.setItem("invoiceData", JSON.stringify(this.invoiceData));
    alert("Do you want to save your invoice?");
  }
}
