import { Component, Inject, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrderServiceService } from '../order-page/order-service.service';
import { CustomerServiceService } from '../../customer/customer-page/customer-service.service';
import { ItemServiceService } from '../../item/item-page/item-service.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AsyncPipe, CommonModule } from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Customer } from '../../../interface/customer';
import { Item } from '../../../interface/item';



@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatAutocompleteModule,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent {

  customer = new FormControl<Customer| null>(null, [Validators.required]);
  item = new FormControl<Item| null>(null, [Validators.required]);
  qty = new FormControl(0, [Validators.required]);
  total = new FormControl(0, [Validators.required]);
  filteredOptions: Observable <any[]> | undefined;
  filteredOptionsCustomer: Observable <any[]> | undefined;
  myControl = new FormControl();
  errorCustomer = ''
  errorItem = ''
  errorQty = ''
  stock : number | undefined;
  listItem : any
  listCustomer : any

  constructor(public dialogRef: MatDialogRef<OrderCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: number, private orderService : OrderServiceService, private customerService:CustomerServiceService, private itemService: ItemServiceService, private cdr: ChangeDetectorRef) {
    this.ngOnInit();
  }



  ngOnInit(): void {
    this.customerService.getAllCustomers('').subscribe((data) => {
      this.listCustomer = data
      this.filteredOptionsCustomer = this.customer.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCustomer(value || '')),
      )
      this.cdr.detectChanges();
    });
    this.itemService.getAllItemByName('').subscribe((data) => {
      this.listItem = data
      this.filteredOptions = this.item.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
      this.cdr.detectChanges();
    });

    this.item.valueChanges.subscribe((data) => {
      this.totalPrice();
      this.updateQtyValidator();
    })

    this.qty.valueChanges.subscribe((data) => {
      this.totalPrice();
    })

  }


  updateQtyValidator() {
    if (this.stock !== undefined) {
      this.qty.setValidators([Validators.required, Validators.max(this.stock)]);
      this.qty.updateValueAndValidity();
    }
  }

  displayFn(item: any): string {
    return item ? item.itemName : '';
  }
  displayFnCustomer(item: any): string {
    return item ? item.customerName : '';
  }



  totalPrice() {
    const itemValue:any = this.item.value;
    const price = itemValue && typeof itemValue === 'object' && itemValue.price ? itemValue.price : 0;
    this.total.setValue((this.qty.value ? this.qty.value : 0) * price);
    this.stock = itemValue && typeof itemValue === 'object' && itemValue.stock ? itemValue.stock : 0;
    console.log((this.qty?.value ? this.qty.value : 0) > (this.stock ? this.stock : 0))
  }

  getErrorMessage() {
    if(this.customer.hasError('required')) {
      this.errorCustomer = 'Customer is required';
    }
    if(this.item.hasError('required')) {
      this.errorItem = 'Item is required';
    }
    if(this.qty.hasError('required')) {
      this.errorQty = 'Invalid Qty';
    }else if(this.qty.hasError('max')){
      this.errorQty = 'Qty must be less than ' + this.stock;
    }
  }
  public _filter(value: any): any[] {
    const filterValue = value?.toLowerCase();
    console.log(this.listItem)
    return this.listItem.filter((option: any) => option.itemName?.toLowerCase().includes(filterValue));
  }

  public _filterCustomer(value: any): any[] {
    const filterValue = value?.toLowerCase();
    console.log(this.listCustomer)
    return this.listCustomer.filter((option: any) => option.customerName?.toLowerCase().includes(filterValue));
  }
  createItem() {
    console.log(this.item.value, this.customer.value, )
    this.orderService.createOrder({
      totalPrice : this.total.value,
      idCustomer : this.customer.value?.customerId ?? "",
      idItem : this.item.value?.itemId ?? "",
      quantity : this.qty.value
    }).subscribe(()=>{
      this.dialogRef.close()
    })
  }


}
