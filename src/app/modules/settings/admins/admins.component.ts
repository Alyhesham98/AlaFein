import { Component } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {
  colsData: any[] = [
    {
      field: 'name',
      text: 'Admin name',
    },
    {
      field: 'Status',
      text: 'Type',
    },
    {
      field: 'Email',
      text: 'Email',
    }
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
}
