import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminsService } from 'src/app/core/services/admins.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
  providers: [MessageService],
})
export class AdminFormComponent implements OnInit {
  adminForm!: FormGroup;
  adminTypes!: any[];
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImage: any;
  constructor(
    private adminService: AdminsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getDropdowns();
    this.adminForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      roleId: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
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
    return this.adminForm.controls;
  }
  onSubmitForm() {
    this.isSubmit = true;
    this.markFormGroupTouched(this.adminForm);
    if (this.adminForm.valid) {
      if (this.config.data) {
        this.adminService.updateAdmin(this.adminForm.getRawValue()).subscribe(
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
        this.adminService.createAdmin(this.adminForm.value).subscribe(
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
      }
    } else {
      return;
    }
  }

  onResetForm() {
    this.adminForm.reset();
  }

  getDropdowns() {
    this.adminService.getAdminsDropdown().subscribe((res: any) => {
      this.adminTypes = res.Data;
      if (this.config.data) {
        this.setFormData();
      }
    });
  }

  setFormData() {
    this.adminForm.get('password')?.setValidators(null);
    this.adminForm.get('email')?.disable();
    this.adminForm.get('roleId')?.disable();

    this.adminForm.setValue({
      id: this.config?.data?.Id,
      firstName: this.config?.data?.FirstName,
      email: this.config?.data?.Email,
      roleId: this.config?.data?.RoleName,
      password: null,
    });
    this.adminTypes?.filter((x: any) => {
      if (x.Name === this.config?.data?.RoleName) {
        this.adminForm.get('roleId')?.setValue(x.Id);
      }
    });
  }
}
