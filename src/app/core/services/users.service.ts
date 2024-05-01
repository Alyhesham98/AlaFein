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
export class UsersService {
  private url = 'https://alafein.azurewebsites.net/api/v1/';
  private userData!: any;

  constructor(private http: HttpClient, private router: Router) {}
  getAllUsers(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}Admin/GetAudiencePaginations?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  toggleBlock(body: any) {
    return this.http.patch(`${this.url}AdminUser/ToggleBlock`, body);
  }

  toggleStatus(body: any) {
    return this.http.patch(`${this.url}AdminUser/ToggleStatus`, body);
  }

  getDropdown() {
    return this.http.get(`${this.url}AdminUser/Dropdown`);
  }

  uploadAdminImage(body: any) {
    return this.http.post(`${this.url}AdminUser/UploadUserImage`, body);
  }

  updateAdmin(body: any) {
    return this.http.patch(`${this.url}AdminUser/Update`, body);
  }

  filterUsers(body: any) {
    return this.http.post(`${this.url}AdminUser/GetFilterPagination`, body);
  }
}
