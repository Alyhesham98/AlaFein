import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() disabled: boolean = false;
  @Input() labelText: string = '';
  @Input() required: boolean = false;
  @Input() formControlName: string = '';
  @Input() placeholder: string = '';
  @Input() uploadURL!: string;
  @Input() multiple: boolean = false;
  @Output() setUploadFile: any = new EventEmitter<File>();

  @Input() file: string = '';
  @Input() fileUrl!: any;
  @Input() files: any[] = [];
  @Input() acceptFiles: string = 'image/*, .pdf';
  uploadFile(event: any) {
    this.isLoading = false;

    if (this.multiple) {
      this.files = this.files || [];
      this.files.push({
        path: event?.originalEvent?.body?.Data,
        name: event?.files[0]?.name,
      });
      this.setUploadFile.emit(this.files);
    } else {
      this.setUploadFile.emit(event);
      this.fileUrl =
        'https://backend.rep-trust.com/' + event.originalEvent.body.Data;
      this.file = event.files[0].name;
    }
  }

  removeFile(event: any, file?: any) {
    if (this.multiple) {
      const index = this.files.indexOf(file);
      if (index > -1) {
        // only splice array when item is found
        this.files.splice(index, 1); // 2nd parameter means remove one item only
        this.setUploadFile.emit(this.files);
      }
    } else {
      this.file = '';
      this.fileUrl = '';
      this.setUploadFile.emit(null);
    }
  }
  isLoading: boolean = false;

  onUploadProgress() {
    this.isLoading = true;
  }
}
