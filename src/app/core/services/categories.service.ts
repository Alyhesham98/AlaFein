import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url = 'http://mshokry-001-site7.anytempurl.com/api/v1/';
  private userData!: any;

  constructor(private http: HttpClient, private router: Router) {}
  getAllCategories(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}Category/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
