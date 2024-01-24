import { Component } from '@angular/core';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss'],
})
export class VenuesComponent {
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
