import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tablesData: any[] = [];
  calendarFilter: any[] = [];
  selectedCalendar: any[] = [];
  dataTypes: any[] = [];

  ngOnInit() {
    this.calendarFilter = [
      { type: 'This Week', code: 'week' },
      { type: 'This Month', code: 'month' },
      { type: 'This Year', code: 'year' },
    ];

    this.dataTypes = [
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
    ];

    this.tablesData = [
      {
        cardName: 'Top Users',
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
      },
      {
        cardName: 'Top Event Organizers',
        filterDate: '01 NOV - 07 NOV 2023',
        tableCols: [
          { key: 'eventName', value: 'Event Organizer Name' },
          { key: 'noOfEvents', value: '# Of Events' },
        ],
        tableData: [
          {
            eventName: 'Maged Moustafa',
            noOfEvents: '5',
          },
          {
            eventName: 'Maged Moustafa',
            noOfEvents: '5',
          },
          {
            eventName: 'Maged Moustafa',
            noOfEvents: '5',
          },
        ],
      },
      {
        cardName: 'Top Venues',
        filterDate: '01 NOV - 07 NOV 2023',
        tableCols: [
          { key: 'venueName', value: 'Venue Name' },
          { key: 'noOfEvents', value: '# Of Events' },
        ],
        tableData: [
          {
            venueName: 'Maged Moustafa',
            noOfEvents: '5',
          },
          {
            venueName: 'Maged Moustafa',
            noOfEvents: '5',
          },
          {
            venueName: 'Maged Moustafa',
            noOfEvents: '5',
          },
        ],
      },
      {
        cardName: 'Top Categories',
        filterDate: '01 NOV - 07 NOV 2023',
        tableCols: [
          { key: 'category', value: 'Category' },
          { key: 'noOfEvents', value: '# Of Events' },
        ],
        tableData: [
          {
            category: 'Museums',
            noOfEvents: '5',
          },
          {
            category: 'Museums',
            noOfEvents: '5',
          },
          {
            category: 'Museums',
            noOfEvents: '5',
          },
        ],
      },
    ];
  }
}
