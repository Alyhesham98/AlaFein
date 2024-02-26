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
  ) {}
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
  setFormData(): void {
    console.log(this.notificationDetails);
    let schedule = new Date(this.notificationDetails?.Schedule);
    this.notificationForm.patchValue({
      id: this.notificationDetails?.Id,
      title: this.notificationDetails?.Title,
      titleAr: this.notificationDetails?.TitleAr,
      body: this.notificationDetails?.Body,
      bodyAr: this.notificationDetails?.BodyAr,
      schedule: schedule,
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
