import { Component } from '@angular/core';

@Component({
  selector: 'app-event-spotlight',
  templateUrl: './event-spotlight.component.html',
  styleUrls: ['./event-spotlight.component.scss']
})
export class EventSpotlightComponent {
  colsData: any[] = [
    {
      field: 'name',
      text: 'Event name',
    },
    {
      field: 'Status',
      text: 'Category',
    },
    {
      field: 'Email',
      text: 'Venue',
    },
    {
      field:'test',
      text: 'Event Organiser'
    },
    {
      field:'test',
      text: 'Event Date'
    }
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
}
