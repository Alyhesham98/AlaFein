import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  eventId: any;
  eventDetails: any;
  eventStatus: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private eventService: EventsService,
    private router: Router
  ) {
    this.activeRoute.params.forEach((params: any) => {
      this.eventId = params.id;
      this.eventStatus = params.status;
    });
  }
  ngOnInit(): void {
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
        this.router.navigate([
          'events/all-events',
        ]);
      });
  }
}
