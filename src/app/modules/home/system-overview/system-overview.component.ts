import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-system-overview',
  templateUrl: './system-overview.component.html',
  styleUrls: ['./system-overview.component.scss'],
})
export class SystemOverviewComponent implements OnInit,OnChanges {
  @Input() systemType!: string;
  @Input() data: any;
  @Input() event!: number;
  @Input() eventOrganizer!: number;
  @Input() users!: number;
  @Input() venue!: number;
  @Input() systemOverviewData: any = {};
  @Output() filterData = new EventEmitter<any>();
  calendarFilter: any[] = [];
  selectedCalendar: any[] = [];
  dataTypes: any = {};

  ngOnInit(): void {
    
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

  ngOnChanges(changes: any): void {
    if(changes?.data?.currentValue&&changes?.data?.previousValue){
      this.dataTypes = {
        cardName: 'System Overview',
        filterDate: '01 NOV - 07 NOV 2023',
        cardsData: [
          {
            name: 'Events',
            type: 'Total Events',
            count: changes.data?.currentValue?.event,
          },
          {
            name: 'Users',
            type: 'New Users',
            count: changes.data?.currentValue?.users,
          },
          {
            name: 'Events',
            type: 'New Event Organizer',
            count: changes.data?.currentValue?.eventOrganizer,
          },
          {
            name: 'Venues',
            type: 'New Venues',
            count: changes.data?.currentValue?.venue,
          },
        ],
      };
    }
  }

  filterDataChange(data:any){
    this.filterData.emit(data);
  }
}
