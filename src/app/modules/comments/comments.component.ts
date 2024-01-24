import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  colsData: any[] = [
    {
      field: 'Name',
      text: 'Name',
    },
    {
      field: 'Status',
      text: 'Status',
    },
    {
      field: 'ExpirationDate',
      text: 'Expire Date',
    },
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
}
