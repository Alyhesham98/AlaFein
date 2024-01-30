import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  uploadedImage: any;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }
  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    this.categoryForm
      .get('image')
      ?.setValue(this.fileInput.nativeElement.files[0]?.name);
    console.log(this.categoryForm.value);
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.categoryService
        .uploadCategoryImage(formData)
        .subscribe((res: any) => {
          this.uploadedImage = res.Data;
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail: 'Image Uploaded Successfully',
          });
        });
    }
  }
  createCategory() {
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
}
