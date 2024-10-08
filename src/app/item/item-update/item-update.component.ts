import { ItemServiceService } from './../item-page/item-service.service';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
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

@Component({
  selector: 'app-item-update',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
  templateUrl: './item-update.component.html',
  styleUrl: './item-update.component.css'
})
export class ItemUpdateComponent {
  errorMessageName='';
  errorMessagePrice='';
  errorMessageStock='';

  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  stock = new FormControl('', [Validators.required]);
  code = new FormControl('');

  constructor(public dialogRef: MatDialogRef<ItemUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: number, private itemService : ItemServiceService, private cdr: ChangeDetectorRef) {
    this.getItem(this.data)
  }

  getItem(id: any) {
    this.itemService.getItemById(id).subscribe(
      (response) => {
        console.log('Respons data dari API:', response); // Logging respons API
        const item = response.data;
        this.name.setValue(item.itemName);
        this.price.setValue(item.price);
        this.stock.setValue(item.stock);
        this.code.setValue(item.itemCode);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error saat memanggil API:', error); // Logging error
      }
    );
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessageName = 'You must enter a value';
    }
    if(this.price.hasError('required')) {
      this.errorMessagePrice = 'You must enter a value';
    }
    if(this.stock.hasError('required')) {
      this.errorMessageStock = 'You must enter a value';
    }
  }

  updateItem() {
    this.itemService.updateItem(this.data, {
      itemName: this.name.value,
      price: this.price.value,
      stock: this.stock.value,
      itemCode: this.code.value
    }).subscribe((data) => {
      this.dialogRef.close();
    })
  }

}
