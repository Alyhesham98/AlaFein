import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-pending-events',
  templateUrl: './pending-events.component.html',
  styleUrls: ['./pending-events.component.scss'],
})
export class PendingEventsComponent {
  colsData: any[] = [
    {
      field: 'Id',
      text: 'ID',
    },
    {
      field: 'Name',
      text: 'Event name',
    },
    {
      field: 'Category.Name',
      text: 'Category',
    },
    {
      field: 'Venue.Name',
      text: 'Venue',
    },
    {
      field: 'Organizer.Name',
      text: 'Organiser',
    },
    {
      field: 'Date',
      text: 'Event Date',
    },
    {
      field: 'CreatedAt',
      text: 'Created At',
    },
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  actions: any[] = ['canView'];

  constructor(private evetnsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.getPendingEvents({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getPendingEvents(e: any) {
    this.evetnsService
      .getAllPendingEvents(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  getEventDetails(data: any) {
    this.router.navigate([
      'events/event-details/' +
        data.Id +
        '/' +
        data?.Status?.Name +
        '/' +
        data?.SubmissionId,
    ]);
  }
}
