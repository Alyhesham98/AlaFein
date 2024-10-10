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
import { start } from 'repl';
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
  minDate = new Date();
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImage: any = null;
  constructor(
    private eventService: EventsService,
    private eventOrganizersService: EventOrganizersService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private datePipe: DatePipe
  ) { }

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
      repeat: new FormControl(null),
      kidsAvailability: new FormControl(false, Validators.required),
      url: new FormControl(null, Validators.required),
      paymentFee: new FormControl(0.0, Validators.required),
    });
  }

  getEventsDropdown() {
    // this.eventOrganizersService
    //   .getAllEventOrganizers(1, 1000)
    //   .subscribe((res: any) => {
    //     this.organizersOptions = res.Data;
    //   });

    this.eventService.getEventsDropdown().subscribe((res: any) => {
      this.eventTypes = res?.Data?.Category;
      this.repeatTypes = res?.Data?.Repeat;
      this.organizersOptions = res?.Data.Organizer;
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
  dateArray!: any[];
  handleDateSelection(selectedDates: any) {
    if (selectedDates && selectedDates[1] === null) {
      this.dateArray = selectedDates;
    } else if (selectedDates && selectedDates.length > 1) {
      var datesArray: any[] = [];
      // Array to store the dates between start and end dates
      var datesBetween = [];

      // Function to iterate through the dates and add them to the array
      var currentDate = new Date(selectedDates[0]);
      var endDate = new Date(selectedDates[1]);
      while (currentDate <= endDate) {
        datesBetween.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      datesBetween.forEach(function (date) {
        datesArray.push(date.toISOString());
      });
      if (datesArray.length >= 1) {
        this.dateArray = datesArray;
      }
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.eventForm.controls;
  }

  submitForm() {
    this.isSubmit = true;
    this.markFormGroupTouched(this.eventForm);
    if (this.eventForm.get('repeat')?.value === null) {
      this.eventForm.get('repeat')?.setValue(0);
    }

    if (this.eventForm.valid) {
      this.eventForm.patchValue({
        venueId: this.eventForm.get('VenueId')?.value.Id,
        attendanceOption: this.eventForm.get('attendanceOption')?.value,
        organizerId: this.eventForm.get('OrganizerId')?.value,
      });

      this.eventForm.removeControl('VenueId');
      this.eventForm.removeControl('OrganizerId');
      if (this.config.data) {
        this.onDateTimeCheck();
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
    this.eventForm.get('paymentFee')?.setValue(attendanceOption.Id ? attendanceOption.Id : attendanceOption);
    if (
      attendanceOption.Id === 0 ||
      attendanceOption.Id === 1 ||
      attendanceOption === 1 ||
      attendanceOption === 0
    ) {
      this.eventForm.get('paymentFee')?.setValidators(Validators.required);
      this.eventForm.get('url')?.setValidators(Validators.required);
      this.eventForm.get('paymentFee')?.setValue(null);
      this.isPaymentAndURL = true;
    } else {
      this.eventForm.get('paymentFee')?.setValidators(null);
      this.eventForm.get('url')?.setValidators(null);
      this.isPaymentAndURL = false;
    }
    this.eventForm.get('paymentFee')?.updateValueAndValidity();
    this.eventForm.get('url')?.updateValueAndValidity();
  }
  fromTimeFormat: any;
  onDateTimeCheck() {
    this.eventForm.get('dateFromTo')?.setValue(this.dateArray);
    const dateRange = this.eventForm.get('dateFromTo')?.value;
    const timePattern = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i;
    const timeFromValue = this.eventForm.get('timeFrom')?.value;

    let fromTime: Date;

    if (timePattern.test(timeFromValue)) {
      let date = new Date(); // Use the current date
      const [time, period] = timeFromValue.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      const parsedHours = period === 'PM' ? (hours % 12) + 12 : hours % 12;

      date.setHours(parsedHours, minutes, 0, 0); // Set time
      fromTime = date;
    } else {
      fromTime = new Date(timeFromValue); // Parse date if not in the expected format
    }

    this.fromTimeFormat = this.datePipe.transform(fromTime, 'HH:mm:ss', 'en-US');

    let datesArray: string[] = [];

    if (dateRange?.length > 1) {
      for (let i = 0; i < dateRange.length; i++) {
        let currentDateTime = new Date(dateRange[i]);
        currentDateTime.setHours(
          parseInt(this.fromTimeFormat?.split(':')[0] || '0', 10)
        );
        currentDateTime.setMinutes(
          parseInt(this.fromTimeFormat?.split(':')[1] || '0', 10)
        );
        currentDateTime.setSeconds(
          parseInt(this.fromTimeFormat?.split(':')[2] || '0', 10)
        );
        currentDateTime.setHours(currentDateTime.getHours() + 3);

        datesArray.push(currentDateTime.toISOString());
      }

      // Handle last date range separately if necessary
      const today = new Date();
      const firstDate = new Date(dateRange[0]);
      const lastDate = new Date(dateRange[dateRange.length - 1]);

      if (today.toDateString() === firstDate.toDateString()) {
        lastDate.setDate(lastDate.getDate() + 1);
        lastDate.setHours(
          parseInt(this.fromTimeFormat?.split(':')[0] || '0', 10)
        );
        lastDate.setMinutes(
          parseInt(this.fromTimeFormat?.split(':')[1] || '0', 10)
        );
        lastDate.setSeconds(
          parseInt(this.fromTimeFormat?.split(':')[2] || '0', 10)
        );
        lastDate.setHours(lastDate.getHours() + 3);

        datesArray.push(lastDate.toISOString());
      } else {
        lastDate.setHours(
          parseInt(this.fromTimeFormat?.split(':')[0] || '0', 10)
        );
        lastDate.setMinutes(
          parseInt(this.fromTimeFormat?.split(':')[1] || '0', 10)
        );
        lastDate.setSeconds(
          parseInt(this.fromTimeFormat?.split(':')[2] || '0', 10)
        );
        lastDate.setHours(lastDate.getHours() + 3);

        datesArray.push(lastDate.toISOString());
      }
    } else if (dateRange?.length === 1) {
      let currentDateTime = new Date(dateRange[0]);
      currentDateTime.setHours(
        parseInt(this.fromTimeFormat?.split(':')[0] || '0', 10)
      );
      currentDateTime.setMinutes(
        parseInt(this.fromTimeFormat?.split(':')[1] || '0', 10)
      );
      currentDateTime.setSeconds(
        parseInt(this.fromTimeFormat?.split(':')[2] || '0', 10)
      );
      currentDateTime.setHours(currentDateTime.getHours() + 3);

      datesArray.push(currentDateTime.toISOString());
    } else {
      let date = new Date();
      if (timePattern.test(timeFromValue)) {
        const [time, period] = timeFromValue.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const parsedHours = period === 'PM' ? (hours % 12) + 12 : hours % 12;

        date.setHours(parsedHours, minutes, 0, 0); // Set time
      } else {
        date = new Date(this.eventForm.get('timeFrom')?.value);
      }

      date.setHours(parseInt(this.fromTimeFormat?.split(':')[0] || '0', 10));
      date.setMinutes(parseInt(this.fromTimeFormat?.split(':')[1] || '0', 10));
      date.setSeconds(parseInt(this.fromTimeFormat?.split(':')[2] || '0', 10));
      date.setHours(date.getHours() + 3);

      datesArray = [date.toISOString()];
    }

    // Remove any invalid entries like "1970-01-01T00:00:00.000Z"
    datesArray = datesArray.filter(date => !date.includes("1970"));

    // Remove duplicate entries
    datesArray = Array.from(new Set(datesArray));

    this.eventForm.patchValue({
      dates: datesArray,
    });
  }


  dateFrom: any;
  dateTo: any;
  firstDateString: any;
  setFormData() {
    this.onAttendanceSelected(this.config.data.data.AttendanceOption.Id);

    // Extracting date and time values
    if (this.config?.data?.data?.Date.length > 1) {

      this.firstDateString = this.config?.data?.data?.Date[this.config?.data?.data?.Date.length - 1];
    } else {
      this.firstDateString = this.config?.data?.data?.Date[0];
    }
    let secondDateString = this.config?.data?.data?.Date[this.config?.data?.data?.Date.length - 1];

    const dateRegex = /^(\d{2})-(\d{2})-(\d{4}), (\d{2}):(\d{2}) (AM|PM)$/;

    // Parse the first date
    if (this.firstDateString && dateRegex.test(this.firstDateString)) {
      const [_, day, month, year, hour, minute, period] = this.firstDateString.match(dateRegex);
      let hours = parseInt(hour);
      if (period === 'PM' && hours < 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0; // Handle midnight
      }

      this.dateFrom = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hours, parseInt(minute));
    } else {
      console.error('Invalid date format:', this.firstDateString);
      return; // Exit the function if the first date is invalid
    }

    // Parse the second date if it exists and is valid
    if (secondDateString && dateRegex.test(secondDateString)) {
      const [_, day, month, year, hour, minute, period] = secondDateString.match(dateRegex);
      let hours = parseInt(hour);
      if (period === 'PM' && hours < 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0; // Handle midnight
      }

      this.dateTo = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hours, parseInt(minute));
    } else {
      this.dateTo = null; // Handle case where the second date is invalid or not provided
    }

    // Adjust the times to add 3 hours
    if (this.dateFrom) {
      this.dateFrom.setHours(this.dateFrom.getHours());
    }
    if (this.dateTo) {
      this.dateTo.setHours(this.dateTo.getHours());
    }

    const timeFrom = this.formatTime(this.dateFrom);

    if (this.dateFrom && this.dateTo) {
      this.dateArray = [this.dateFrom, this.dateTo];
    } else if (this.dateFrom) {
      this.dateArray = [this.dateFrom];
    }
    console.log(this.dateArray);

    this.eventForm.setValue({
      eventNameEN: this.config.data.data.EventNameEN,
      eventNameAR: this.config.data.data.EventNameAR,
      eventDescriptionEN: this.config.data.data.EventDescriptionEN,
      mainArtestNameEN: this.config.data.data.MainArtestNameEN,
      mainArtestNameAR: this.config.data.data.MainArtestNameAR,
      categoryId: this.config.data.data.Category.Id,
      dateFromTo: this.dateArray,
      timeFrom: timeFrom,
      dates: this.dateArray,
      venueId: this.config.data.data.Venue.Id,
      VenueId: this.config.data.data.Venue.Id,
      organizerId: this.config.data.data?.Organizer
        ? this.config.data.data.Organizer.Id
        : this.config.data.data.Venue.Id,
      OrganizerId: this.config.data.data?.Organizer
        ? this.config.data.data.Organizer.Id
        : this.config.data.data.Venue.Id,
      branchId: this.config.data.data.Branch.Id,
      attendanceOption: this.config.data.data.AttendanceOption.Id,
      poster: this.config.data.data.Poster,
      contactPerson: this.config.data.data.ContactPerson,
      addtionalComment: this.config.data.data.AddtionalComment,
      repeat: this.config.data.data.Repeat ? this.config.data.data.Repeat : 0,
      kidsAvailability: this.config.data.data.KidsAvailability,
      url: this.config.data.data.URL ? this.config.data.data.URL : '  ',
      paymentFee: this.config.data.data.PaymentFee,
      id: +this.config.data.submissionId,
    });
    this.uploadedImage = this.config?.data?.data?.Poster;
    this.eventForm.get('poster')?.setValue(this.config?.data?.data?.Poster);
    this.eventForm
      .get('organizerId')
      ?.setValue(
        this.config?.data?.data?.Organizer
          ? this.config?.data?.data?.Organizer.Id
          : this.config?.data?.data?.Venue.Id
      );
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
