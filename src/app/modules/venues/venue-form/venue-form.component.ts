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
      branches: this.formBuilder.array([]),
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
  newValue: any = {};
  openTimePickerDialog(data?: any, index?: any, type?: any) {
    const ref = this.dialogService.open(TimePickerComponent, {
      header: 'Select Time Range',
      width: '70%',
      height: '40%',
      baseZIndex: 10000,
      data: data,
    });
    console.log(data);

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

        // console.log(newValue);

        // Push the newValue into the workDays form control array
        const workDaysFormArray = this.branches.at(index).get('workDays');
        if (index > 0) {
          this.daysArray = [];
        }
        for (let i = 0; i <= data.length; i++) {
          this.newValue = {
            day: data[i], // Assuming result.day holds the selected day
            from: dateStart ? dateStart : null,
            to: dateEnd ? dateEnd : null,
          };
        }
        this.daysArray.push(this.newValue);
        if (
          this.newValue.from !== null &&
          this.newValue.to !== null &&
          this.newValue.day !== null
        ) {
          workDaysFormArray?.setValue(this.daysArray);
        } else {
          workDaysFormArray?.reset();
        }
      } else {
        // Handle if the dialog is closed without selecting a time range
        this.branches.at(index).get('workDays')?.reset();
      }
    });
  }

  isDaySelected(branchIndex: number, day: string): boolean {
    const workDays = this.branches.at(branchIndex).get('workDays')?.value;
    return workDays.includes(day);
  }

  openDayForEditing(branchIndex: number, day: string) {
    // Retrieve the FormControl for workDays
    const workDaysControl = this.branches.at(branchIndex).get('workDays');

    // Get the array of workDays from the FormControl
    const workDaysArray = workDaysControl?.value;

    // Find the index of the selected day in the array
    const dayIndex = workDaysArray.findIndex((item: any) => item.day === day);

    // Check if the day is already selected
    if (dayIndex !== -1) {
      // If the day is already selected, retrieve the existing data
      const existingData = workDaysArray[dayIndex];
      this.openTimePickerDialog(existingData, branchIndex, 'edit');
    } else {
      // If the day is not selected, initialize a new object with default values
      const newData = {
        day: day,
        from: null, // Provide default values for time if necessary
        to: null,
      };
      this.openTimePickerDialog(newData, branchIndex);
    }
  }
}
