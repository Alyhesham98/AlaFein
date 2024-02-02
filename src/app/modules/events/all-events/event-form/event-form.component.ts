import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  eventTypes!: any[];

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      nameEn: new FormControl(null, Validators.required),
      nameAr: new FormControl(null, Validators.required),
      eventType: new FormControl(null, Validators.required),
      eventDescription: new FormControl(null, Validators.required),
      artistNameEn: new FormControl(null, Validators.required),
      artistNameAr: new FormControl(null, Validators.required),
      eventDate: new FormControl(null, Validators.required),
      venue: new FormControl(null, Validators.required),
      attendanceOption: new FormControl(null, Validators.required),
      eventPoster: new FormControl(null, Validators.required),
      eventContact: new FormControl(null, Validators.required),
      additionalComments: new FormControl(null, Validators.required),
    });

    this.eventTypes = [
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
