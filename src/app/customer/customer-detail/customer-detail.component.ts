import { CustomerServiceService } from './../customer-page/customer-service.service';
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
import { MatButtonModule } from '@angular/material/button';

interface CustomerDetail {
  customerId: number;
  customerName: string;
  customerAddress: string;
  customerCode: string;
  customerPhone: string;
  lastOrderDate: any;
  pic: string;
  active: boolean;
}

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css',
})
export class CustomerDetailComponent {
  customer: any;

  constructor(
    public dialogRef: MatDialogRef<CustomerDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private customerService: CustomerServiceService,
    private cdr: ChangeDetectorRef
  ) {
    this.fetchData(this.data);

  }

  fetchData(data: any) {
    this.customerService.getCustomerById(data).subscribe((data) => {
      this.customer = data.data;
      console.log(data);
      this.cdr.detectChanges();
    });
  }
}
