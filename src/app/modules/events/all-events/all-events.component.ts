import { Component } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';
import { EventFormComponent } from './event-form/event-form.component';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss'],
  providers: [DialogService, MessageService],
})
export class AllEventsComponent {
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
      field: 'Status.Name',
      text: 'Status',
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
  ref: DynamicDialogRef | undefined;
  actions: any[] = ['canApprove', 'canView', 'canSpotlight'];
  constructor(
    private evetnsService: EventsService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllEvents({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getAllEvents(e: any) {
    this.evetnsService
      .getAllEvents(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  changeSpotlightStatus(data: any) {
    this.evetnsService
      .toggleSpotlight({ id: data.Id })
      .subscribe((res: any) => {
        if (res.Succeeded) {
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail: data.IsSpotlight
              ? 'Remove Spotlighted Event Successfully'
              : 'Event Spotlighted Successfully!',
          });
          this.getAllEvents({ pageNumber: 1, pageSize: 10 });
        } else {
          this.messageService.add({
            key: 'toast1',
            severity: 'error',
            summary: 'Error',
            detail: 'Error Spotlight Event.',
          });
        }
      });
  }

  show(data?: any) {
    this.ref = this.dialogService.open(EventFormComponent, {
      header: 'EVENT FORM SUBMISSION',
      width: '80%',
      height: 'auto',
      contentStyle: { overflow: 'auto' },
      maximizable: false,
      data: data,
    });

    this.ref.onClose.subscribe((res) =>
      res ? this.getAllEvents({ pageNumber: 1, pageSize: 10 }) : ''
    );
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

  filter: boolean = false;

  onSearch(event: any) {
    this.filter = true;
    this.evetnsService
      .filterEvents({
        pageSize: event?.rows ? event?.rows : this.pageSize,
        pageNumber: event.page ? event.page + 1 : 1,
        name: event.name ? event.name : null,
        venue: event.venue ? event.venue : null,
        isSpotlight: event.isSpotlight ? event.isSpotlight : null,
        isApproved: event.isApproved ? event.isApproved : null,
      })
      .subscribe((res: any) => {
        this.rowsData = res.Data;
        this.pageNumber = res.PageNumber;
        this.pageSize = res.PageSize;
        this.totalRecords = res.PgTotal;
      });
  }
}
