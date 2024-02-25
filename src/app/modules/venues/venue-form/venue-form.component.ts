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
  weekDays: any[] = [];
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
      branches: this.formBuilder.array([]),
    });
  }

  addBranch() {
    const item = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      mapLink: new FormControl(null, Validators.required),
      workDays: new FormControl(null, Validators.required),
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
      res?.Data?.Days.forEach((element: any) => {
        this.weekDays.push({
          Id: element.Id,
          Name: element.Name,
          startTime: null,
          endTime: null,
        });
      });
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
  selectedWeekDays: any[] = []; // Initialize an array to store selected weekdays
  newValue: any = {};
  openTimePickerDialog(data?: any, index?: any, type?: any) {
    const ref = this.dialogService.open(TimePickerComponent, {
      header: 'Select Time Range',
      width: '70%',
      height: '40%',
      baseZIndex: 10000,
      data: data,
    });

    ref.onClose.subscribe((result: any) => {
      if (result) {
        const workDaysFormArray = this.branches.at(index).get('workDays');
        result.forEach((element: any) => {
          const date = new Date(element.startTime);
          const dateStart = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const endDate = new Date(element.endTime);
          const dateEnd = endDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          this.newValue = [
            {
              day: element.Id, // Assuming result.day holds the selected day
              from: dateStart ? dateStart : null,
              to: dateEnd ? dateEnd : null,
            },
          ];
          workDaysFormArray?.setValue(this.newValue);
        });
        data.forEach((element: any) => {
          this.selectedWeekDays.push(element);
        });
      }
    });
  }

  openDay(index: any, data: any) {
    // Check if the selected weekday is already in the selectedWeekDays array
    if (
      this.selectedWeekDays.length > 0 &&
      data.length < this.selectedWeekDays.length
    ) {
      if (this.selectedWeekDays === data) {
        // If already selected, you may choose to do nothing or provide feedback to the user
        this.openTimePickerDialog(data, index);
      } else {
        return; // Exit the function without opening the dialog
      }
    } else {
      this.openTimePickerDialog(data, index);
    }
  }
}
