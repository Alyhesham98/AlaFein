import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VenuesService } from 'src/app/core/services/venues.service';

@Component({
  selector: 'app-venue-form',
  templateUrl: './venue-form.component.html',
  styleUrls: ['./venue-form.component.scss'],
  providers: [MessageService],
})
export class VenueFormComponent implements OnInit {
  formPageNumber = 1;
  userForm!: FormGroup;
  venueForm!: FormGroup;
  branchForm!: FormGroup;
  genreTypes!: any[];
  weekDays!: any[];
  venueFacilties!: any[];

  uploadedImage: any;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private venuesService: VenuesService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDropdown();
    this.userForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      profilePicture: new FormControl(null, Validators.required),
    });

    this.venueForm = new FormGroup({
      instagram: new FormControl(null, Validators.required),
      facebook: new FormControl(null, Validators.required),
      websiteURL: new FormControl(null, Validators.required),
      other: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      venueName: new FormControl(null, Validators.required),
      venueDescription: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      photos: new FormControl([], Validators.required),
      venueFacilities: new FormControl([], Validators.required),
      // branches: this.branchForm.value,
    });

    this.branchForm = new FormGroup({
      branches: this.formBuilder.array([]),
    });
  }

  addItem() {
    const item = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      mapLink: new FormControl(null, Validators.required),
      workDays: new FormControl([null], Validators.required),
    });

    // Add the new form group to the FormArray
    this.branches.push(item);
  }

  // Helper method to get the 'items' FormArray
  get branches() {
    return this.branchForm.get('branches') as FormArray;
  }

  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.venuesService.uploadUserImage(formData).subscribe((res: any) => {
        this.uploadedImage = res.Data;
        this.userForm.get('profilePicture')?.setValue(this.uploadedImage);
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          summary: 'Success',
          detail: 'Image Uploaded Successfully',
        });
      });
    }
  }

  onVenueFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.venuesService.uploadVenueUserImage(formData).subscribe((res: any) => {
        this.uploadedImage = res.Data;
        let imagesArray = [];
        imagesArray.push(this.uploadedImage);
        this.venueForm.get('photos')?.setValue(imagesArray);
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          summary: 'Success',
          detail: 'Image Uploaded Successfully',
        });
      });
    }
  }

  getDropdown() {
    this.venuesService.getDropdown().subscribe((res: any) => {
      this.genreTypes = res?.Data?.Category;
      this.weekDays = res?.Data?.Days;
      this.venueFacilties = res?.Data?.Facility;
    });
  }

  onFormSubmit() {
    const body = {
      user: this.userForm.value,
      venue: this.venueForm.value,
    };
    console.log(body);
  }

  onResetForm() {
    this.userForm.reset();
    this.venueForm.reset();
    this.branchForm.reset();
  }
}
