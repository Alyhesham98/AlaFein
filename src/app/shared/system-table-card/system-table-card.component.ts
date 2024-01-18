import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-table-card',
  templateUrl: './system-table-card.component.html',
  styleUrls: ['./system-table-card.component.scss'],
})
export class SystemTableCardComponent implements OnInit {
  @Input() cardData: any = {};

  calendarFilter: any[] = [];
  selectedCalendar: any[] = [];

  ngOnInit() {
    this.calendarFilter = [
      { type: 'This Week', code: 'week' },
      { type: 'This Month', code: 'month' },
      { type: 'This Year', code: 'year' },
    ];
  }
}
