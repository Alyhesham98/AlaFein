import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FacilitiesService } from 'src/app/core/services/facilities.service';

@Component({
  selector: 'app-facilities-form',
  templateUrl: './facilities-form.component.html',
  styleUrls: ['./facilities-form.component.scss'],
  providers: [MessageService],
})
export class FacilitiesFormComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private facilityService: FacilitiesService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}
  facilityForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImage: any;
  facilityDetails: any;
  ngOnInit(): void {
    this.createForm();
    if (this.config?.data) {
      this.facilityDetails = this.config?.data;
      this.setFormData();
    }
  }
  setFormData(): void {
    this.uploadedImage = this.facilityDetails.ImagePath;
    this.facilityForm.patchValue({
      id: this.facilityDetails?.Id,
      imagePath: this.facilityDetails?.ImagePath,
      imageName: this.facilityDetails?.ImageName,
    });
  }
  createForm() {
    this.facilityForm = new FormGroup({
      id: new FormControl(null),
      imagePath: new FormControl(null, Validators.required),
      imageName: new FormControl(null, Validators.required),
    });
  }
  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    // this.facilityForm
    //   .get('imageName')
    //   ?.setValue(this.fileInput.nativeElement.files[0]?.name);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.facilityService
        .uploadFacilityImage(formData)
        .subscribe((res: any) => {
          this.uploadedImage = res.Data;
          this.facilityForm.get('imagePath')?.setValue(this.uploadedImage);
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail: 'Image Uploaded Successfully',
          });
        });
    }
  }
  createFaciliy() {
    if (this.facilityForm.valid) {
      this.facilityService.createFacility(this.facilityForm.value).subscribe(
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

  updateFacility() {
    if (this.facilityForm.valid) {
      this.facilityService.updateFacility(this.facilityForm.value).subscribe(
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
