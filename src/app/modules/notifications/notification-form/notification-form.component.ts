import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
  providers: [MessageService],
})
export class NotificationFormComponent {
  notificationForm!: FormGroup;
  adminTypes!: any[];
  uploadedImage: any;
  notificationDetails: any;
  constructor(
    private notificationService: NotificationsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.notificationForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, Validators.required),
      titleAr: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      bodyAr: new FormControl(null, Validators.required),
      schedule: new FormControl(null),
    });

    if (this.config?.data) {
      this.notificationDetails = this.config?.data;
      this.setFormData();
    }
  }
  scheduleDate!: Date;
  setFormData(): void {
    if (this.notificationDetails?.Schedule !== '-') {

      const dateParts = this.notificationDetails?.Schedule.split(' ');
      const timeParts = dateParts[1].split(':');
      const datePart = dateParts[0].split('/');

      let hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);
      const isPM = dateParts[2] === 'PM';

      if (isPM && hours !== 12) {
        hours += 12;
      } else if (!isPM && hours === 12) {
        hours = 0;
      }

      const day = parseInt(datePart[0], 10);
      const month = parseInt(datePart[1], 10) - 1; // months are 0-based in JavaScript Date
      const year = 2000 + parseInt(datePart[2], 10); // assuming year 20xx

      this.scheduleDate = new Date(year, month, day, hours, minutes, seconds);
    }


    this.notificationForm.patchValue({
      id: this.notificationDetails?.Id,
      title: this.notificationDetails?.Title,
      titleAr: this.notificationDetails?.TitleAr,
      body: this.notificationDetails?.Body,
      bodyAr: this.notificationDetails?.BodyAr,
      schedule: this.scheduleDate ? this.scheduleDate : null,
    });
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
    return this.notificationForm.controls;
  }
  onSubmitForm() {
    const scheduleValue: Date = this.notificationForm.get('schedule')?.value;
    if (scheduleValue) {
      // Clone the original date to avoid modifying the original object
      const adjustedDate: Date = new Date(scheduleValue.getTime());
      adjustedDate.setHours(adjustedDate.getHours() + 2); // Add two hours
      this.notificationForm.get('schedule')?.setValue(adjustedDate.toISOString());
    }
    this.isSubmit = true;
    this.markFormGroupTouched(this.notificationForm);
    if (this.notificationForm.valid) {
      this.notificationService
        .addNotification(this.notificationForm.value)
        .subscribe(
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
              detail: err.Message,
            });
          }
        );
    } else {
      return;
    }
  }

  editNotification() {
    this.notificationService
      .editNotification(this.notificationForm.value)
      .subscribe((res: any) => {
        this.ref.close(true);
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          summary: 'Success',
          detail: res.Message,
        });
      });
  }

  onResetForm() {
    this.notificationForm.reset();
  }
}
