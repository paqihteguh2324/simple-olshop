import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}

  getAllCustomers(name:any) {
    return this.http.get<any>('http://localhost:8081/customer/getAll?name='+name);
  }

  getCustomerById(id: number) {
    return this.http.get<any>('http://localhost:8081/customer/get/' + id);
  }

  createCustomer(customer:any){
    return this.http.post<any>('http://localhost:8081/customer/create', customer);
  }

  updateCustomer(id: number, customer: any) {
    return this.http.put<any>('http://localhost:8081/customer/update/' + id, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete<any>('http://localhost:8081/customer/delete/' + id);
  }

  uploadFoto(file:File){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('http://localhost:8081/minio/post', formData);
  }
}
