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

  uploadVenueUserImage(body: any) {
    return this.http.post(`${this.url}AdminVenue/UploadVenueImage`, body);
  }
}
