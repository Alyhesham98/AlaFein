import { Component } from '@angular/core';

@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.scss'],
})
export class OrganizersComponent {
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
