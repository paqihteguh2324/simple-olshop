import { CustomerServiceService } from './customer-service.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, NgModule } from '@angular/core';
import { NgFor, CommonModule  } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';

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
import { CustomerCreateComponent } from '../customer-create/customer-create.component';
export interface customerElement {
  customerName: string;
  customerPhone: string;
  pic:string;
}

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [NgFor, MatTableModule,MatButtonModule, MatGridListModule,ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    CommonModule,
    MatIconModule, FormsModule, MatInputModule
  ],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent implements OnInit {
  data: any;
  detail:any;
  gridCols: number | undefined;
  searchValue= new FormControl('');

  constructor(private customerService: CustomerServiceService, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { } // Inject the service

  ngOnInit() {
    this.fetchData();
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).subscribe(result => {
      if (result.matches) {
        this.setGridCols();
      }
    });

  }


  private setGridCols(): void {
    if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.gridCols = 3;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.gridCols = 4;
    }else if(this.breakpointObserver.isMatched(Breakpoints.XSmall)){
      this.gridCols = 1
    }else if(this.breakpointObserver.isMatched(Breakpoints.Large)){
      this.gridCols = 5
    }else if(this.breakpointObserver.isMatched(Breakpoints.XLarge)){
      this.gridCols = 5
    }
     else {
      this.gridCols = 5;
    }
  }

  fetchData() {
    this.customerService.getAllCustomers(this.searchValue.value )
      .subscribe((data) => {
        this.data = data;
        console.log(data);
      });
  }


  openDialogDetail(id:number) {
    this.dialog.open(CustomerDetailComponent, {
      data:id,
      width:"50%"
    });
  }

  openDialogUpdate(id:number){
    const dialogRef = this.dialog.open((CustomerUpdateComponent), {
      data:id,
      width:"50%"
    });

    dialogRef.afterClosed().subscribe(() => {
        this.fetchData();
    });
  }

  openDialogCreate(){
    const dialogRef = this.dialog.open((CustomerCreateComponent), {
      width:"50%"
    })

    dialogRef.afterClosed().subscribe(() => {
      this.fetchData();
  });
  }

  deleteCustomer(id:number){
    this.customerService.deleteCustomer(id).subscribe((data) => {
      this.fetchData();
    })
  }

  searchCustomer(){
    this.fetchData();
  }

  displayedColumns: string[] = ['customerName', 'customerPhone', 'pic', 'action'];


}
