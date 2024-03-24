import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { log } from 'console';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventOrganizersService } from 'src/app/core/services/event-organizers.service';

@Component({
  selector: 'app-event-organizers-form',
  templateUrl: './event-organizers-form.component.html',
  styleUrls: ['./event-organizers-form.component.scss'],
  providers: [MessageService],
})
export class EventOrganizersFormComponent implements OnInit {
  eventForm!: FormGroup;
  eventSecondForm!: FormGroup;
  eventTypes!: any[];
  uploadedImage: any = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  editMode: boolean = false;
  constructor(
    private eventOrganizersService: EventOrganizersService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getDropdown();
    this.eventForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      profilePicture: new FormControl(null, Validators.required),
    });

    this.eventSecondForm = new FormGroup({
      id: new FormControl(null),
      mapLink: new FormControl(null),
      address: new FormControl(null, Validators.required),
      instagram: new FormControl(null, Validators.required),
      facebook: new FormControl(null, Validators.required),
      websiteURL: new FormControl(null, Validators.required),
      other: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });
    if (this.config.data) {
      this.editMode = true;
      this.setFormData();
    }
  }

  resetForm() {
    this.eventForm.reset();
    this.eventSecondForm.reset();
    this.uploadedImage = null;
  }

  getDropdown() {
    this.eventOrganizersService
      .getEventOrganizersDropdown()
      .subscribe((res: any) => {
        this.eventTypes = res.Data;
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.eventForm.controls;
  }

  get g(): { [key: string]: AbstractControl } {
    return this.eventSecondForm.controls;
  }

  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.eventOrganizersService
        .uploadEventUserImage(formData)
        .subscribe((res: any) => {
          this.uploadedImage = res.Data;
          this.eventForm.get('profilePicture')?.setValue(this.uploadedImage);
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
  onSubmitForm() {
    this.isSubmit = true;
    this.markFormGroupTouched(this.eventForm);
    this.markFormGroupTouched(this.eventSecondForm);

    if (this.eventForm.valid && this.eventSecondForm.valid) {
      const body = {
        user: this.eventForm.value,
        organizer: this.eventSecondForm.value,
      };
      if (this.editMode) {
        this.eventOrganizersService
          .updateOrganizer(this.eventSecondForm.value)
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
              if (err.error?.Errors?.length >= 1) {
                err.error.Errors.forEach((element: any) => {
                  this.messageService.add({
                    key: 'toast1',
                    severity: 'error',
                    summary: 'Error',
                    detail: element,
                  });
                });
              }

              if (err.error?.Message) {
                this.messageService.add({
                  key: 'toast1',
                  severity: 'error',
                  summary: 'Error',
                  detail: err.error.Message,
                });
              }
            }
          );
      } else {
        this.eventOrganizersService.createEventOrganizer(body).subscribe(
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
            if (err.error?.Errors?.length >= 1) {
              err.error.Errors.forEach((element: any) => {
                this.messageService.add({
                  key: 'toast1',
                  severity: 'error',
                  summary: 'Error',
                  detail: element,
                });
              });
            }

            if (err.error?.Message) {
              this.messageService.add({
                key: 'toast1',
                severity: 'error',
                summary: 'Error',
                detail: err.error.Message,
              });
            }
          }
        );
      }
    } else {
      return;
    }
  }

  onResetForm() {
    this.eventForm.reset();
    this.eventSecondForm.reset();
  }

  setFormData() {
    this.eventForm.get('password')?.clearValidators();
    this.eventForm.get('email')?.clearValidators();
    this.eventForm.get('firstName')?.clearValidators();
    this.eventForm.get('lastName')?.clearValidators();

    this.eventForm.patchValue({
      id: this.config.data.organizer.User.Id,
      firstName: this.config.data.organizer.User.FirstName,
      lastName: this.config.data.organizer.User.LastName,
      profilePicture: this.config.data.organizer.User.ProfilePicture,
    });
    this.uploadedImage = this.config.data.organizer.User.ProfilePicture;
    this.eventSecondForm.patchValue({
      id: this.config.data.id,
      mapLink: this.config.data.organizer.MapLink,
      address: this.config.data.organizer.Address,
      instagram: this.config.data.organizer.Instagram,
      facebook: this.config.data.organizer.Facebook,
      websiteURL: this.config.data.organizer.WebsiteURL,
      other: this.config.data.organizer.Other,
      description: this.config.data.organizer.Description,
      categoryId: this.config.data.organizer.Category.Id,
    });
  }

  changeValidation(formControl?: any) {
    console.log('testsadf');

    if (
      this.eventSecondForm.get('facebook')?.value !== null ||
      this.eventSecondForm.get('instagram')?.value !== null ||
      this.eventSecondForm.get('websiteURL')?.value !== null ||
      this.eventSecondForm.get('other')?.value !== null
    ) {
      this.eventSecondForm.get('facebook')?.setValidators(null);
      this.eventSecondForm.get('instagram')?.setValidators(null);
      this.eventSecondForm.get('websiteURL')?.setValidators(null);
      this.eventSecondForm.get('other')?.setValidators(null);
      this.eventSecondForm.get('facebook')?.updateValueAndValidity();
      this.eventSecondForm.get('instagram')?.updateValueAndValidity();
      this.eventSecondForm.get('websiteURL')?.updateValueAndValidity();
      this.eventSecondForm.get('other')?.updateValueAndValidity();
      this.markFormGroupTouched(this.eventSecondForm);
      this.eventSecondForm.updateValueAndValidity();
    } else if (
      this.eventSecondForm.get('facebook')?.value === null &&
      this.eventSecondForm.get('instagram')?.value === null &&
      this.eventSecondForm.get('websiteURL')?.value === null &&
      this.eventSecondForm.get('other')?.value === null
    ) {
      this.eventSecondForm.get('facebook')?.setValidators(Validators.required);
      this.eventSecondForm.get('instagram')?.setValidators(Validators.required);
      this.eventSecondForm.get('websiteURL')?.setValidators(Validators.required);
      this.eventSecondForm.get('other')?.setValidators(Validators.required);
      this.eventSecondForm.get('facebook')?.updateValueAndValidity();
      this.eventSecondForm.get('instagram')?.updateValueAndValidity();
      this.eventSecondForm.get('websiteURL')?.updateValueAndValidity();
      this.eventSecondForm.get('other')?.updateValueAndValidity();
      this.markFormGroupTouched(this.eventSecondForm);
      this.eventSecondForm.updateValueAndValidity();
    }
  }
}
