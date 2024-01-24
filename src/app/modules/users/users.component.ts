import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
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
