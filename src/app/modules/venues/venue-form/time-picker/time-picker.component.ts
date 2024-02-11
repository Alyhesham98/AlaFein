import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit {
  selectedDate!: Date;
  selectedTime!: Date;

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {}

  onSave() {
    // Emit the selected date and time range
    this.ref.close({
      date: this.selectedDate,
      startTime: this.selectedTime,
      endTime: this.selectedTime,
    });
  }
}
