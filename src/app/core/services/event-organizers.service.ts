import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class EventOrganizersService {
  private url = 'https://alafein.azurewebsites.net/api/v1/';

  constructor(private http: HttpClient, private router: Router) {}

  createEventOrganizer(body: any) {
    return this.http.post(`${this.url}AdminEventOrganizer/Register`, body);
  }

  getAllEventOrganizers(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}AdminEventOrganizer/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getEventOrganizersDropdown() {
    return this.http.get(`${this.url}AdminEventOrganizer/Dropdown`);
  }

  uploadEventUserImage(body: any) {
    return this.http.post(
      `${this.url}AdminEventOrganizer/UploadUserImage`,
      body
    );
  }

  filterEventsOrganizers(body: any) {
    return this.http.post(`${this.url}AdminEventOrganizer/GetFilterPagination`, body);
  }
}
