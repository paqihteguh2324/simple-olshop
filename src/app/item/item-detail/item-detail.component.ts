import { Component, Inject } from '@angular/core';
import { ItemServiceService } from '../item-page/item-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
  item: any;

  constructor(
    private itemService: ItemServiceService,
    public dialogRef: MatDialogRef<ItemDetailComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.itemService.getItemById(this.data).subscribe((response) => {
      this.item = response.data;
      this.cdr.detectChanges();
    });
  }
}
