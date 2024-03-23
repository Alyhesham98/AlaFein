import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventOrganizersService } from 'src/app/core/services/event-organizers.service';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  providers: [MessageService, DatePipe],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  eventTypes!: any[];
  repeatTypes!: any[];

  attendanceOptions!: any[];
  repeatOptions!: any[];
  venuesOptions!: any[];
  organizersOptions!: any[];
  branchOptions!: any[];
  isPaymentAndURL = false;
  dateFromTo: any;
  timeFrom: any;
  timeTo: any;

  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImage: any = null;
  constructor(
    private eventService: EventsService,
    private eventOrganizersService: EventOrganizersService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getEventsDropdown();
  }

  initForm() {
    this.eventForm = new FormGroup({
      id: new FormControl(null),
      eventNameEN: new FormControl(null, Validators.required),
      eventNameAR: new FormControl(null, Validators.required),
      eventDescriptionEN: new FormControl(null, Validators.required),
      mainArtestNameEN: new FormControl(null),
      mainArtestNameAR: new FormControl(null),
      categoryId: new FormControl(null, Validators.required),
      dateFromTo: new FormControl(null, Validators.required),
      timeFrom: new FormControl(null, Validators.required),
      timeTo: new FormControl(null, Validators.required),
      dates: new FormControl([]),
      VenueId: new FormControl(null, Validators.required),
      OrganizerId: new FormControl(null, Validators.required),
      venueId: new FormControl(null),
      organizerId: new FormControl(null),
      branchId: new FormControl(null, Validators.required),
      attendanceOption: new FormControl(null, Validators.required),
      poster: new FormControl(null),
      contactPerson: new FormControl(null),
      addtionalComment: new FormControl(null),
      repeat: new FormControl(0),
      kidsAvailability: new FormControl(false, Validators.required),
      url: new FormControl('', Validators.required),
      paymentFee: new FormControl(0, Validators.required),
    });
  }

  getEventsDropdown() {
    this.eventOrganizersService
      .getAllEventOrganizers(1, 10)
      .subscribe((res: any) => {
        this.organizersOptions = res.Data;
      });

    this.eventService.getEventsDropdown().subscribe((res: any) => {
      this.eventTypes = res?.Data?.Category;
      this.repeatTypes = res?.Data?.Repeat;
      this.attendanceOptions = res?.Data?.Attendance;
      this.repeatOptions = res?.Data?.Repeat;
      this.venuesOptions = res?.Data?.Venue;
      if (this.config.data) {
        this.setFormData();
      }
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
  isSubmit: boolean = false;
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.eventForm.controls;
  }

  submitForm() {
    this.isSubmit = true;
    this.markFormGroupTouched(this.eventForm);

    if (this.eventForm.valid) {
      this.eventForm.patchValue({
        venueId: this.eventForm.get('VenueId')?.value.Id,
        attendanceOption: this.eventForm.get('attendanceOption')?.value.Id,
        organizerId: this.eventForm.get('OrganizerId')?.value,
      });
      this.eventForm.removeControl('VenueId');
      this.eventForm.removeControl('OrganizerId');
      if (this.config.data) {
        this.eventService.updateParentEvent(this.eventForm.value).subscribe(
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
        this.onDateTimeCheck();
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
      }
    } else {
      return;
    }
  }

  onVenueSelected(event: any) {
    this.branchOptions = event.Branch;
  }

  onAttendanceSelected(attendanceOption: any) {
    if (
      attendanceOption.Id === 0 ||
      attendanceOption.Id === 1 ||
      attendanceOption === 1 ||
      attendanceOption === 0
    ) {
      this.eventForm.get('paymentFee')?.setValidators(Validators.required);
      this.eventForm.get('url')?.setValidators(Validators.required);
      this.isPaymentAndURL = true;
    } else {
      this.eventForm.get('paymentFee')?.setValidators(null);
      this.eventForm.get('url')?.setValidators(null);
      this.isPaymentAndURL = false;
    }
    this.eventForm.get('paymentFee')?.updateValueAndValidity();
    this.eventForm.get('url')?.updateValueAndValidity();
  }

  onDateTimeCheck() {
    const dateRange = this.eventForm.get('dateFromTo')?.value;
    const fromTime = this.datePipe.transform(
      this.eventForm.get('timeFrom')?.value,
      'HH:mm:ss',
      'en-US'
    );
    const toTime = this.datePipe.transform(
      this.eventForm.get('timeTo')?.value,
      'HH:mm:ss',
      'en-US'
    );

    const startDateTime =
      formatDate(dateRange[0], 'yyyy-MM-dd', 'en-US') + ' ' + fromTime;
    const endDateTime =
      formatDate(dateRange[1], 'yyyy-MM-dd', 'en-US') + ' ' + toTime;

    const datesArray = [
      new Date(startDateTime).toISOString(),
      new Date(endDateTime).toISOString(),
    ];

    this.eventForm.patchValue({
      dates: datesArray,
    });
  }

  setFormData() {
    this.onAttendanceSelected(this.config.data.data.AttendanceOption.Id);

    // Extracting date and time values
    const dateFrom = new Date(this.config?.data?.data?.Date[0]);
    const dateTo = new Date(this.config?.data?.data?.Date[1]);
    const timeFrom = this.formatTime(dateFrom);
    const timeTo = this.formatTime(dateTo);

    this.eventForm.setValue({
      eventNameEN: this.config.data.data.EventNameEN,
      eventNameAR: this.config.data.data.EventNameAR,
      eventDescriptionEN: this.config.data.data.EventDescriptionEN,
      mainArtestNameEN: this.config.data.data.MainArtestNameEN,
      mainArtestNameAR: this.config.data.data.MainArtestNameAR,
      categoryId: this.config.data.data.Category.Id,
      dateFromTo: [dateFrom, dateTo],
      timeFrom: timeFrom,
      timeTo: timeTo,
      dates: [dateFrom, dateTo],
      venueId: this.config.data.data.Venue.Id,
      VenueId: this.config.data.data.Venue.Id,
      organizerId: this.config.data.data.Organizer.Id,
      OrganizerId: this.config.data.data.Organizer.Id,
      branchId: this.config.data.data.Branch.Id,
      attendanceOption: this.config.data.data.AttendanceOption.Id,
      poster: this.config.data.data.Poster,
      contactPerson: this.config.data.data.ContactPerson,
      addtionalComment: this.config.data.data.AddtionalComment,
      repeat: 1,
      kidsAvailability: this.config.data.data.KidsAvailability,
      url: this.config.data.data.URL ? this.config.data.data.URL : '  ',
      paymentFee: this.config.data.data.PaymentFee,
      id: +this.config.data.submissionId,
    });
    this.uploadedImage = this.config?.data?.data?.Poster;
    this.eventForm.get('poster')?.setValue(this.config?.data?.data?.Poster);
    this.eventForm
      .get('organizerId')
      ?.setValue(this.config?.data?.data?.Organizer.Id);
    this.eventForm.get('venueId')?.setValue(this.config?.data?.data?.Venue.Id);

    this.venuesOptions?.filter((x: any) => {
      if (x.Id === this.config?.data?.data?.Venue.Id) {
        this.onVenueSelected(x);
        this.eventForm.get('VenueId')?.setValue(x);
      }
    });
  }

  formatTime(date: Date): string {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  resetForm() {
    this.eventForm.reset();
    this.uploadedImage = null;
  }
}
