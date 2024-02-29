import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-overview',
  templateUrl: './system-overview.component.html',
  styleUrls: ['./system-overview.component.scss'],
})
export class SystemOverviewComponent implements OnInit {
  @Input() systemType!: string;
  @Input() data: any;
  @Input() event!: number;
  @Input() eventOrganizer!: number;
  @Input() users!: number;
  @Input() venue!: number;

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
      cardName: 'System Overview',
      filterDate: '01 NOV - 07 NOV 2023',
      cardsData: [
        {
          name: 'Events',
          type: 'Total Events',
          count: this.data.event,
        },
        {
          name: 'Users',
          type: 'New Users',
          count: this.data.users,
        },
        {
          name: 'Events',
          type: 'New Event Organizer',
          count: this.data.eventOrganizer,
        },
        {
          name: 'Venues',
          type: 'New Venues',
          count: this.data.venue,
        },
      ],
    };

    this.systemOverviewData = {
      cardName: 'System Overview',
      filterDate: '01 NOV - 07 NOV 2023',
      tableCols: [
        { key: 'eventName', value: 'Event Name' },
        { key: 'category', value: 'Category' },
        { key: 'venue', value: 'Venue' },
        { key: 'eventOrganizer', value: 'Event Organizer' },
        { key: 'eventDate', value: 'Event Date' },
      ],
      tableData: [
        {
          eventName: 'AlaFein',
          category: 'Workshops',
          venue: 'Bibliotheca Alexandria',
          eventOrganizer: 'Maged Moustafa',
          eventDate: '23-09-2023, 09:00PM',
        },
        {
          eventName: 'AlaFein',
          category: 'Workshops',
          venue: 'Bibliotheca Alexandria',
          eventOrganizer: 'Maged Moustafa',
          eventDate: '23-09-2023, 09:00PM',
        },
      ],
    };
  }
}
