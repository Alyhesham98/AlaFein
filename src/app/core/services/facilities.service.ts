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
export class FacilitiesService {
  private url = 'https://alafein.azurewebsites.net/api/v1/';
  private userData!: any;

  constructor(private http: HttpClient, private router: Router) {}

  getAllFacilities(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}Facility/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
