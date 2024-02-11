import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class VenuesService {
  private url = 'https://alafein.azurewebsites.net/api/v1/';

  constructor(private http: HttpClient, private router: Router) {}

  getAllVenues(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}AdminVenue/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  uploadUserImage(body: any) {
    return this.http.post(`${this.url}AdminVenue/UploadUserImage`, body);
  }
  uploadVenueUserImage(body: any) {
    return this.http.post(`${this.url}AdminVenue/UploadVenueImage`, body);
  }

  getDropdown() {
    return this.http.get(`${this.url}AdminVenue/Dropdown`);
  }

  createVenue(body: any) {
    return this.http.post(`${this.url}AdminVenue/Register`, body);
  }
}
