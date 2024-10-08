import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) {
  }


  getAllOrders(name:any, pageSize:any, pageNumber:any) {
    return this.http.get<any>('http://localhost:8081/order/getAll?name' + name +'&pageSize='+pageSize+'&pageNumber='+pageNumber);
  }

  getOrderById(id: number) {
    return this.http.get<any>('http://localhost:8081/order/detail/' + id);
  }

  createOrder(order: any) {
    return this.http.post<any>('http://localhost:8081/order/create', order);
  }

  updateOrder(id: number, order: any) {
    return this.http.put<any>('http://localhost:8081/order/update/' + id, order);
  }

  deleteOrder(id: number) {
    return this.http.delete<any>('http://localhost:8081/order/delete/' + id);
  }

  exportOrder() {
    return this.http.get('http://localhost:8081/order/export/list', {
      responseType: 'blob'
    });
  }


}
