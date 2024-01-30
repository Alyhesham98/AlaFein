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
  private url = 'https://alafein.azurewebsites.net/api/v1/';
  private userData!: any;

  constructor(private http: HttpClient, private router: Router) {}
  getAllCategories(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}Category/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  createCategory(body: any) {
    return this.http.post(`${this.url}Category/Add`, body);
  }

  uploadCategoryImage(body: any) {
    return this.http.post(`${this.url}Category/UploadCategoryImage`, body);
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.url}Category/Delete/${id}`);
  }

  approveCategory(data: any) {
    return this.http.patch(`${this.url}Category/TogglePublish`, data);
  }
}
