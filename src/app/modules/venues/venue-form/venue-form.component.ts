import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  venueForm!: FormGroup;
  genreTypes!: any[];
  weekDays!: any[];
  venueFacilties!: any[];

  uploadedImage: any;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private venuesService: VenuesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.venueForm = new FormGroup({
      nameEn: new FormControl(null, Validators.required),
      nameAr: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      venueDescriptionEn: new FormControl(null, Validators.required),
      venueDescriptionAr: new FormControl(null, Validators.required),
      genre: new FormControl(null, Validators.required),
      selectedFacilities: new FormControl(null, Validators.required),
      selectedDays: new FormControl(null, Validators.required),
      instagram: new FormControl(null, Validators.required),
      facebook: new FormControl(null, Validators.required),
    });

    this.genreTypes = [
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.venueFacilties = [
      {
        name: '../../../../assets/icons/venueFacilities/parking.svg',
        value: 'parking',
      },
      {
        name: '../../../../assets/icons/venueFacilities/food.svg',
        value: 'food',
      },
      {
        name: '../../../../assets/icons/venueFacilities/smoking.svg',
        value: 'smoking',
      },
      {
        name: '../../../../assets/icons/venueFacilities/wheelchair.svg',
        value: 'wheelchair',
      },
      {
        name: '../../../../assets/icons/venueFacilities/wifi.svg',
        value: 'wifi',
      },
    ];

    this.weekDays = [
      { name: 'Saturday', value: 'saturday' },
      { name: 'Sunday', value: 'sunday' },
      { name: 'Monday', value: 'monday' },
      { name: 'Tuesday', value: 'tuesday' },
      { name: 'Wednesday', value: 'wednesday' },
      { name: 'Thursday', value: 'thursday' },
      { name: 'Friday', value: 'friday' },
    ];
  }

  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    this.venueForm
      .get('image')
      ?.setValue(this.fileInput.nativeElement.files[0]?.name);

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.venuesService
        .uploadVenueUserImage(formData)
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

  onFormSubmit() {
    console.log(this.venueForm.value);
  }

  onResetForm() {
    this.venueForm.reset();
  }
}
