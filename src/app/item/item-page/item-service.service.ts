import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) {
  }

  getAllItem(name:any, pageSize:any, pageNumber:any) {
      return this.http.get('http://localhost:8081/item/getAll?name='+name+'&pageSize='+pageSize+'&pageNumber='+pageNumber);
    }

  getAllItemByName(name:any) {
    return this.http.get('http://localhost:8081/item/getAll?name='+name);
  }

  getItemById(id: number){
    return this.http.get<any>('http://localhost:8081/item/get/' + id);
  }

  deleteItem(id: number){
    return this.http.delete<any>('http://localhost:8081/item/delete/' + id);
  }

  createItem(item: any){
    return this.http.post<any>('http://localhost:8081/item/create', item);
  }

  updateItem(id: number, item: any){
    return this.http.put<any>('http://localhost:8081/item/update/' + id, item);
  }
}
