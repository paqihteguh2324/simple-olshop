import { ItemServiceService } from './../item-page/item-service.service';
import { Component, Inject, OnInit } from '@angular/core';
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
  selector: 'app-item-create',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css'
})
export class ItemCreateComponent {
  errorMessageName='';
  errorMessagePrice='';
  errorMessageStock='';

  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  stock = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<ItemCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: number, private itemService : ItemServiceService) { }

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

  createItem() {
    this.itemService.createItem({
      itemName: this.name.value,
      stock: this.stock.value,
      price: this.price.value,
    }).subscribe(()=>{
      this.dialogRef.close()
    })
  }

}
