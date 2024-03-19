import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  providers: [MessageService],
})
export class UsersFormComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private userService: UsersService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}
  usersForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  types: any[] = [];
  uploadedImage: any;
  usersDetails: any;
  ngOnInit(): void {
    this.getDropdown();
    this.createForm();
    if (this.config?.data) {
      this.usersDetails = this.config?.data;
      this.setFormData();
    }
  }
  setFormData(): void {
    console.log(this.usersDetails);

    this.uploadedImage = this.usersDetails.Photo
      ? this.usersDetails.Photo
      : null;
    this.usersForm.patchValue({
      id: this.usersDetails?.Id,
      firstName: this.usersDetails?.FirstName,
      lastName: this.usersDetails?.LastName,
      photo: this.usersDetails?.Photo,
      phone: this.usersDetails?.phone,
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
    return this.usersForm.controls;
  }
  createForm() {
    this.usersForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      // phone: new FormControl(null, Validators.required),
    });
  }

  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    this.usersForm
      .get('image')
      ?.setValue(this.fileInput.nativeElement.files[0]?.name);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.userService.uploadAdminImage(formData).subscribe((res: any) => {
        this.uploadedImage = res.Data;
        this.usersForm.get('photo')?.setValue(this.uploadedImage);
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          summary: 'Success',
          detail: 'Image Uploaded Successfully',
        });
      });
    }
  }

  updateUser() {
    this.isSubmit = true;
    this.markFormGroupTouched(this.usersForm);
    if (this.usersForm.valid && this.uploadedImage) {
      this.userService.updateAdmin(this.usersForm.value).subscribe(
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

  getDropdown() {
    this.userService.getDropdown().subscribe((res: any) => {
      this.types = res.Data;
    });
  }
}
