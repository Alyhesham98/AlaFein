import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
  providers: [MessageService],
})
export class CategoriesFormComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private categoryService: CategoriesService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}
  categoryForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImage: any = null;
  categoryDetails: any;
  ngOnInit(): void {
    this.createForm();
    if (this.config?.data) {
      this.categoryDetails = this.config?.data;
      this.setFormData();
    }
  }
  setFormData(): void {
    this.uploadedImage = this.categoryDetails.Image;
    this.categoryForm.patchValue({
      id: this.categoryDetails?.Id,
      name: this.categoryDetails?.Name,
      image: this.categoryDetails?.Image,
    });
  }
  createForm() {
    this.categoryForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }

  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    this.categoryForm
      .get('image')
      ?.setValue(this.fileInput.nativeElement.files[0]?.name);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.categoryService
        .uploadCategoryImage(formData)
        .subscribe((res: any) => {
          this.uploadedImage = res.Data;
          this.categoryForm.get('image')?.setValue(this.uploadedImage);
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
    return this.categoryForm.controls;
  }
  createCategory() {
    this.isSubmit = true;
    this.markFormGroupTouched(this.categoryForm);
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(
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

  updateCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.updateCategory(this.categoryForm.value).subscribe(
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
