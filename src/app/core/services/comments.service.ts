import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private url = 'https://alafein.azurewebsites.net/api/v1/';

  constructor(private http: HttpClient, private router: Router) {}

  getAllComments(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.url}AdminComment/GetPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  toggleCommentStatus(body: any) {
    return this.http.patch(`${this.url}AdminComment/ToggleComment`, body);
  }

  filterComment(body: any) {
    return this.http.post(`${this.url}AdminComment/GetFilterPagination`, body);
  }
}
