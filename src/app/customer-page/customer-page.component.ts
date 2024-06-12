import { CustomerServiceService } from './customer-service.service';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import {MatFormFieldModule} from '@angular/material/form-field';
export interface customerElement {
  customerName: string;
  customerPhone: string;
  pic:string;
}

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [NgFor, MatTableModule,MatButtonModule, MatGridListModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent implements OnInit {
  data: any;

  constructor(private customerService: CustomerServiceService, public dialog: MatDialog) { } // Inject the service

  ngOnInit() {
    this.fetchData();
  }
  public fetchData() {
    this.customerService.getAllCustomers()
      .subscribe((data) => {
        this.data = data;
        console.log(data);
      });
  }

  openDialogDetail() {
    this.dialog.open(CustomerPageComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  displayedColumns: string[] = ['customerName', 'customerPhone', 'pic', 'action'];


}
