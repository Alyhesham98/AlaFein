import { Component } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';
import { EventFormComponent } from '../all-events/event-form/event-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-spotlight',
  templateUrl: './event-spotlight.component.html',
  styleUrls: ['./event-spotlight.component.scss'],
  providers: [DialogService],
})
export class EventSpotlightComponent {
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
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  actions: any[] = ['canView'];
  constructor(
    private evetnsService: EventsService,
    private router: Router,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getSpotlightEvents({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getSpotlightEvents(e: any) {
    this.evetnsService
      .getAllSpotlightEvents(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  reOrderDetails(event: any) {
  }
  ref: DynamicDialogRef | undefined;

  show(data?: any) {
    this.evetnsService
      .getParentDetails(data.SubmissionId)
      .subscribe((res: any) => {
        let body = {
          data: res.Data,
          submissionId: data.SubmissionId,
        };
        this.ref = this.dialogService.open(EventFormComponent, {
          header: 'EVENT FORM SUBMISSION',
          width: '80%',
          height: 'auto',
          contentStyle: { overflow: 'auto' },
          maximizable: false,
          data: body,
        });

        this.ref.onClose.subscribe((res) =>
          this.router.navigate(['events/event-spotlight'])
        );
      });
  }
}
