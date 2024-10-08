import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CustomerServiceService } from '../customer-page/customer-service.service';
@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent {
  customer:any
  errorMessageName = '';
  errorMessagePhone = '';
  errorMessageAddress = '';
  errorMessagePic = '';

  constructor(private customerService: CustomerServiceService, public dialogRef: MatDialogRef<CustomerCreateComponent>){
    }

  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  pic = new FormControl('', [Validators.required]);
  fileLink : any
  code = new FormControl('');

  getErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessageName = 'You must enter a value';
    }
    if(this.phone.hasError('required')) {
      this.errorMessagePhone = 'You must enter a value';
    }
    if(this.address.hasError('required')) {
      this.errorMessageAddress = 'You must enter a value';
    }
  }

  createCustomer(){
    this.customerService.createCustomer({
      customerName: this.name.value,
      customerPhone: this.phone.value,
      customerAddress: this.address.value,
      pic: this.pic.value,
      customerCode: this.code.value
    }).subscribe((data) => {
      console.log(data);
      this.dialogRef.close();
    })
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.customerService.uploadFoto(file).subscribe((data) => {
        this.fileLink = data.fileLink
        this.pic.setValue(data.filename)
      })
      // Here you can handle the file, for example, upload it to the server
      console.log(file);
    } else {
      this.pic.setErrors({ required: true });
      this.getErrorMessage();
    }
  }
}
