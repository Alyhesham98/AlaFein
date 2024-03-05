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
  @Input() systemOverviewData: any = {};

  calendarFilter: any[] = [];
  selectedCalendar: any[] = [];
  dataTypes: any = {};

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
          count: this.data?.event,
        },
        {
          name: 'Users',
          type: 'New Users',
          count: this.data?.users,
        },
        {
          name: 'Events',
          type: 'New Event Organizer',
          count: this.data?.eventOrganizer,
        },
        {
          name: 'Venues',
          type: 'New Venues',
          count: this.data?.venue,
        },
      ],
    };

  }
}
