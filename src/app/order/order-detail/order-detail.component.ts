import { Component, Inject } from '@angular/core';
import { OrderServiceService } from '../order-page/order-service.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [ MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  order: any;

  constructor(private orderService : OrderServiceService, @Inject(MAT_DIALOG_DATA) public data: number) {
    this.orderService.getOrderById(this.data).subscribe((response) => {
      this.order = response;
    })
    console.log(this.order);
   }
}
