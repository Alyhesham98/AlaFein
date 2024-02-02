import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventOrganizersService } from 'src/app/core/services/event-organizers.service';

@Component({
  selector: 'app-event-organizers-form',
  templateUrl: './event-organizers-form.component.html',
  styleUrls: ['./event-organizers-form.component.scss'],
  providers: [MessageService],
})
export class EventOrganizersFormComponent implements OnInit {
  eventForm!: FormGroup;
  eventTypes!: any[];
  uploadedImage: any;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private eventOrganizersService: EventOrganizersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      nameEn: new FormControl(null, Validators.required),
      nameAr: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      eventDescription: new FormControl(null, Validators.required),
      genre: new FormControl(null, Validators.required),
      instagram: new FormControl(null, Validators.required),
      facebook: new FormControl(null, Validators.required),
      website: new FormControl(null, Validators.required),
      other: new FormControl(null, Validators.required),
    });

    this.eventTypes = [
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    this.eventForm
      .get('image')
      ?.setValue(this.fileInput.nativeElement.files[0]?.name);

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.eventOrganizersService
        .uploadEventUserImage(formData)
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
}
