import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit {
  selectedDate: Date = new Date();
  selectedTime: Date = new Date();

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    const data = this.config.data;
    this.selectedDate = data.date ? new Date(data.date) : new Date(); // Initialize with current date if data.date is undefined
    this.selectedTime = data.startTime ? new Date(data.startTime) : new Date(); // Initialize with current time if data.startTime is undefined
  }

  onSave() {
    if (this.selectedDate && this.selectedTime) {      
      this.config.data[this.config.data.length - 1].startTime = new Date(this.selectedDate);
      this.config.data[this.config.data.length - 1].endTime = new Date(this.selectedTime);
      this.ref.close(this.config.data);
    } else {
      this.ref.close();
    }
  }
}
