import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';
import { EventFormComponent } from '../all-events/event-form/event-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  providers: [DialogService, MessageService],
})
export class EventDetailsComponent implements OnInit {
  eventId: any;
  eventDetails: any;
  eventStatus: any;
  submissionId: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private eventService: EventsService,
    private router: Router,
    public dialogService: DialogService
  ) {
    this.activeRoute.params.forEach((params: any) => {
      this.eventId = params.id;
      this.eventStatus = params.status;
      this.submissionId = params.parentId;
    });
  }
  userData: any;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') ?? '{}');
    this.getEventsDetails();
  }

  getEventsDetails() {
    this.eventService.getEventsDetails(this.eventId).subscribe((res: any) => {
      this.eventDetails = res.Data;
    });
  }

  toggleStatus(status: any) {
    this.eventService
      .toggleStatus({ id: this.eventDetails?.Id, status: status })
      .subscribe((res: any) => {
        this.router.navigate(['events/all-events']);
      });
  }
  ref: DynamicDialogRef | undefined;

  show(data?: any) {
    this.eventService
      .getParentDetails(this.submissionId)
      .subscribe((res: any) => {
        let body = {
          data: res.Data,
          submissionId: this.submissionId,
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
          this.router.navigate(['events/all-events'])
        );
      });
  }
}
