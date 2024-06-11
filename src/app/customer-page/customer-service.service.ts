import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}

  getAllCustomers() {
    return this.http.get<any>('http://localhost:8081/customer/getAll');
  }
}
