import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  providers: [MessageService],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  eventTypes!: any[];
  attendanceOptions!: any[];
  repeatOptions!: any[];
  venuesOptions!: any[];
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImage: any;
  constructor(
    private eventService: EventsService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getEventsDropdown();
  }

  initForm() {
    this.eventForm = new FormGroup({
      eventNameEN: new FormControl(null, Validators.required),
      eventNameAR: new FormControl(null, Validators.required),
      eventDescriptionEN: new FormControl(null, Validators.required),
      mainArtestNameEN: new FormControl(null, Validators.required),
      mainArtestNameAR: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      eventDate: new FormControl(null, Validators.required),
      dates: new FormControl([], Validators.required),
      venueId: new FormControl(null, Validators.required),
      branchId: new FormControl(null, Validators.required),
      attendanceOption: new FormControl(null, Validators.required),
      poster: new FormControl(null, Validators.required),
      contactPerson: new FormControl(null, Validators.required),
      addtionalComment: new FormControl(null, Validators.required),
      repeat: new FormControl(null, Validators.required),
      // kidsAvailability: new FormControl(null, Validators.required),
      // url: new FormControl(null, Validators.required),
      // paymentFee: new FormControl(null, Validators.required),
    });
  }

  getEventsDropdown() {
    this.eventService.getEventsDropdown().subscribe((res: any) => {
      this.eventTypes = res?.Data?.Category;
      this.attendanceOptions = res?.Data?.Attendance;
      this.repeatOptions = res?.Data?.Repeat;
      this.venuesOptions = res?.Data?.Venue;
    });
  }
  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.eventService.uploadEventImage(formData).subscribe((res: any) => {
        this.uploadedImage = res.Data;
        this.eventForm.get('poster')?.setValue(this.uploadedImage);
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          summary: 'Success',
          detail: 'Image Uploaded Successfully',
        });
      });
    }
  }
  submitForm() {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe(
        (res: any) => {
          this.ref.close(true);

          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail: res.Message,
          });
        },
        (err) => {
          this.messageService.add({
            key: 'toast1',
            severity: 'error',
            summary: 'Error',
            detail: err.error.Message,
          });
        }
      );
    } else {
      return;
    }
  }
}
