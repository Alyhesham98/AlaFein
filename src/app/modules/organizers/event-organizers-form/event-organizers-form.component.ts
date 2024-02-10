import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { log } from 'console';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventOrganizersService } from 'src/app/core/services/event-organizers.service';

@Component({
  selector: 'app-event-organizers-form',
  templateUrl: './event-organizers-form.component.html',
  styleUrls: ['./event-organizers-form.component.scss'],
  providers: [MessageService],
})
export class EventOrganizersFormComponent implements OnInit {
  eventForm!: FormGroup;
  eventSecondForm!: FormGroup;
  eventTypes!: any[];
  uploadedImage: any;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private eventOrganizersService: EventOrganizersService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getDropdown();
    this.eventForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      profilePicture: new FormControl(null, Validators.required),
    });

    this.eventSecondForm = new FormGroup({
      mapLink: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      instagram: new FormControl(null, Validators.required),
      facebook: new FormControl(null, Validators.required),
      websiteURL: new FormControl(null, Validators.required),
      other: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });
  }

  getDropdown(){
    this.eventOrganizersService.getEventOrganizersDropdown().subscribe((res:any)=>{
      this.eventTypes = res.Data
    })
  }

  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.eventOrganizersService
        .uploadEventUserImage(formData)
        .subscribe((res: any) => {
          this.uploadedImage = res.Data;
          this.eventForm.get('profilePicture')?.setValue(this.uploadedImage);
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail: 'Image Uploaded Successfully',
          });
        });
    }
  }

  onSubmitForm() {
    console.log(this.eventForm.valid);
    console.log(this.eventSecondForm.valid);
    
    
    if (this.eventForm.valid && this.eventSecondForm.valid) {
      const body = {
        user: this.eventForm.value,
        organizer: this.eventSecondForm.value,
      };
      this.eventOrganizersService.createEventOrganizer(body).subscribe(
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
      return;
    }
  }

  onResetForm() {
    this.eventForm.reset();
    this.eventSecondForm.reset();
  }
}
