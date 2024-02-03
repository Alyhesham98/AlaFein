import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  private url = 'https://alafein.azurewebsites.net/api/v1/';

  constructor(private http: HttpClient, private router: Router) {}

  getAllAdmins(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}Admin/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
