import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private url = 'https://alafein.azurewebsites.net/api/v1/';
  private userData!: any;

  constructor(private http: HttpClient, private router: Router) {}

  getAllNotifications(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}AdminNotification/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  addNotification(data: any) {
    return this.http.post(`${this.url}AdminNotification/Add`, data);
  }
  editNotification(data: any) {
    return this.http.put(`${this.url}AdminNotification/Update`, data);
  }
  deleteNotification(id: any) {
    return this.http.delete(`${this.url}AdminNotification/Delete/${id}`);
  }
}
