import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VenuesService } from 'src/app/core/services/venues.service';
import { TimePickerComponent } from './time-picker/time-picker.component';

@Component({
  selector: 'app-venue-form',
  templateUrl: './venue-form.component.html',
  styleUrls: ['./venue-form.component.scss'],
  providers: [MessageService, DialogService],
})
export class VenueFormComponent implements OnInit {
  formPageNumber = 1;
  userForm!: FormGroup;
  venueForm!: FormGroup;
  branchForm!: FormGroup;
  genreTypes!: any[];
  weekDays!: any[];
  venueFacilties!: any[];
  selectedWorkday: any;
  display: boolean = false;
  uploadedImage: any;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private venuesService: VenuesService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private ref: DynamicDialogRef
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
      branches: this.formBuilder.array([])
    });
  }

  addBranch() {
    const item = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      mapLink: new FormControl(null, Validators.required),
      workDays: new FormControl(
        this.daysArray.length > 0 ? this.daysArray : null,
        Validators.required
      ),
    });

    // Add the new form group to the FormArray
    this.branches.push(item);
  }

  removeControl(index: number) {
    this.branches.removeAt(index);
  }

  // Helper method to get the 'items' FormArray
  get branches(): FormArray {
    return this.venueForm.get('branches') as FormArray;
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
      this.venuesService
        .uploadVenueUserImage(formData)
        .subscribe((res: any) => {
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
    // let x = {
    //   venue:
    // }
    const body = {
      user: this.userForm.value,
      venue: this.venueForm.value,
    };
    console.log(body);
    
    this.venuesService.createVenue(body).subscribe((res: any) => {
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
    this.userForm.reset();
    this.venueForm.reset();
  }
  daysArray: any[] = [];
  openTimePickerDialog(data?: any, index?: any) {
    const ref = this.dialogService.open(TimePickerComponent, {
      header: 'Select Time Range',
      width: '70%',
      height: '40%',
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((result: any) => {
      if (result) {
        const date = new Date(result.date);
        const dateStart = date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const endDate = new Date(result.startTime);
        const dateEnd = endDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        let value = [];

        if (data.value.length > 1) {
          value.push(data.value.shift());
        }
        const workDaysFormArray = this.branches.at(index).get('workDays');
        let newValue = {
          day: value[0], // Assuming result.day holds the selected day
          from: dateStart ? dateStart : null,
          to: dateEnd ? dateEnd : null,
        };

        if (index > 0) {
          this.daysArray = [];
        }
        this.daysArray.push(newValue);
        if (
          newValue.from !== null &&
          newValue.to !== null &&
          newValue.day !== null
        ) {
          workDaysFormArray?.setValue(this.daysArray);
        } else {
          workDaysFormArray?.reset();
        }
      }
    });
  }
}
