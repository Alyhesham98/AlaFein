import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private url = 'https://alafein.azurewebsites.net/api/v1/';
  private userData!: any;

  constructor(private http: HttpClient, private router: Router) {}

  getAllEvents(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}AdminEvent/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllSpotlightEvents(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}AdminEvent/GetSpotlightPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllPendingEvents(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}AdminEvent/GetPendingPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getEventsDetails(id: string) {
    return this.http.get(`${this.url}AdminEvent/Details/${id}`);
  }

  getEventsDropdown() {
    return this.http.get(`${this.url}AdminSubmission/Dropdown`);
  }

  createEvent(body: any) {
    return this.http.post(`${this.url}AdminSubmission/Add`, body);
  }

  uploadEventImage(body: any) {
    return this.http.post(`${this.url}AdminSubmission/UploadPosterImage`, body);
  }

  toggleSpotlight(data: any) {
    return this.http.patch(`${this.url}AdminEvent/ToggleSpotlight`, data);
  }

}
