import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-overview',
  templateUrl: './system-overview.component.html',
  styleUrls: ['./system-overview.component.scss'],
})
export class SystemOverviewComponent implements OnInit {
  @Input() systemType!: string;

  calendarFilter: any[] = [];
  selectedCalendar: any[] = [];
  dataTypes: any = {};
  systemOverviewData: any = {};

  ngOnInit(): void {
    this.calendarFilter = [
      { type: 'This Week', code: 'week' },
      { type: 'This Month', code: 'month' },
      { type: 'This Year', code: 'year' },
    ];

    this.dataTypes = {
      cardName: 'Top Users',
      filterDate: '01 NOV - 07 NOV 2023',
      cardsData: [
        {
          name: 'Events',
          type: 'Total Events',
          count: 27,
        },
        {
          name: 'Users',
          type: 'New Users',
          count: 70,
        },
        {
          name: 'Events',
          type: 'New Event Organizer',
          count: 4,
        },
        {
          name: 'Venues',
          type: 'New Venues',
          count: 4,
        },
      ],
    };

    this.systemOverviewData = {
      cardName: 'System Overview',
      filterDate: '01 NOV - 07 NOV 2023',
      tableCols: [
        { key: 'name', value: 'User Name' },
        { key: 'status', value: 'Status' },
      ],
      tableData: [
        {
          name: 'Maged Moustafa',
          status: 'Premium',
        },
        {
          name: 'Maged Moustafa',
          status: 'Premium',
        },
        {
          name: 'Maged Moustafa',
          status: 'Premium',
        },
      ],
    };
  }
}
