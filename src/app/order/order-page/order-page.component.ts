import { OrderServiceService } from './order-service.service';
import { Component } from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog} from '@angular/material/dialog';
import {MatPaginatorModule,PageEvent} from '@angular/material/paginator';

import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrderCreateComponent } from '../order-create/order-create.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderUpdateComponent } from '../order-update/order-update.component';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatGridListModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  searchValue = new FormControl('')
  pageSize = new FormControl(10)
  pageNumber = new FormControl(0)
  length : any
  data:any

  constructor(public dialog: MatDialog, private orderService : OrderServiceService) {
    this.orderService.getAllOrders(this.searchValue.value, this.pageSize.value, this.pageNumber.value).subscribe((data)=>{
      this.data = data
    })
  }

  openDialogCreate(){
    const dialogRef =this.dialog.open(OrderCreateComponent)
    dialogRef.afterClosed().subscribe(() => {
      this.fetchData();
  });
  }

  searchOrder(){

  }

  openDialogUpdate(id:number){
    const dialogRef = this.dialog.open(OrderUpdateComponent, {
      data:id
    })
    dialogRef.afterClosed().subscribe(() => {
      this.fetchData();
  });
  }

  openDialogDetail(id:number){
    this.dialog.open(OrderDetailComponent, {
      data:id
    })
  }

  handleDelete(id:number){
    this.orderService.deleteOrder(id).subscribe((data)=>{
      this.fetchData();
    })
  }

   handlePageEvent(event: PageEvent) {
    console.log(event);
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  fetchData(){
    this.orderService.getAllOrders(this.searchValue.value, this.pageSize.value, this.pageNumber.value).subscribe((data)=>{
      this.data = data
    })
  }

  exportOrders() {
    this.orderService.exportOrder().subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'order_report.pdf'; // Nama file yang diunduh
      link.click();
      window.URL.revokeObjectURL(downloadURL); // Optional: Cleanup URL setelah digunakan
    });
  }


  displayedColumns: string[] = ['orderDate', 'orderCode','itemName','quantity','customerName','totalPrice', 'action'];
}
