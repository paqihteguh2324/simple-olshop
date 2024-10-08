import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from './item-service.service';

import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MatGridListModule } from '@angular/material/grid-list';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ItemUpdateComponent } from '../item-update/item-update.component';
import {MatPaginatorModule,PageEvent} from '@angular/material/paginator';
import { ItemCreateComponent } from '../item-create/item-create.component';

import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatGridListModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent implements OnInit {
  searchValue = new FormControl('')
  pageSize = new FormControl(10)
  pageNumber = new FormControl(0)
  length : any
  data:any
  constructor(private itemService: ItemServiceService, private dialog:MatDialog ) {

  }

  pageEvent : PageEvent | undefined
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize.setValue(e.pageSize);
    this.pageNumber.setValue(e.pageIndex);
    console.log(e)
    this.fetchData()
  }

  ngOnInit(){
    this.fetchData()
  }

  searchItem(){
    console.log(this.searchValue.value)
    this.fetchData()
  }

  fetchData(){
    this.itemService.getAllItem(this.searchValue.value, this.pageSize.value, this.pageNumber.value).subscribe((data)=>{
      this.data = data
      this.length = this.data.length
    })

  }

  openDialogDetail(id:number){
    this.dialog.open(ItemDetailComponent, {
      data:id
    })
  }

  openDialogUpdate(id:number){
    const dialogRef = this.dialog.open(ItemUpdateComponent,{
      data:id
    })

    dialogRef.afterClosed().subscribe(() => {
      this.fetchData();
    });
  }

  openDialogCreate(){
    const dialogRef =this.dialog.open(ItemCreateComponent)

    dialogRef.afterClosed().subscribe(() => {
      this.fetchData();
    });
  }

  deleteItem(id:number){
    this.itemService.deleteItem(id).subscribe((data)=>{
      this.fetchData()
    })
  }


  displayedColumns: string[] = ['itemName', 'stock', 'price', 'action'];
}
