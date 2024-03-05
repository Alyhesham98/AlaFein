import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-system-table-card',
  templateUrl: './system-table-card.component.html',
  styleUrls: ['./system-table-card.component.scss'],
})
export class SystemTableCardComponent implements OnInit {
  @Input() cardData: any = {};
  @Input() systemType!: string;
  @Input() showFilter: boolean = false;
  calendarFilter: any[] = [];
  selectedCalendar: any[] = [];
  @Output() filterOutput = new EventEmitter<any>();
  ngOnInit() {
    this.calendarFilter = [
      { type: 'This Week', code: 'week' },
      { type: 'This Month', code: 'month' },
      { type: 'This Year', code: 'year' },
    ];
  }

  getValue(obj: any, path: any, columnType = ''): string {
    if (
      typeof obj[path] === 'string' ||
      typeof obj[path] === 'number' ||
      obj[path] === null
    ) {
      if (['date', 'range'].includes(columnType)) {
        return obj[path];
      }
      return obj[path] || obj[path] === 0 ? obj[path] : '—';
    }
    const pathArr = path.split('.');
    if (obj[pathArr[0]] instanceof Array) {
      let str = '';
      for (const item of obj[pathArr[0]]) {
        if (str.length) {
          str += ', ';
        }
        str += item[pathArr[1]];
      }
      return str;
    }
    if (!obj[pathArr[0]]) {
      return '';
    }
    const result = obj[pathArr[0]][pathArr[1]];
    if (result === null || result === undefined) {
      return '—';
    }
    return result;
  }
  body: any = {};

  onFilterChange(data: any) {    
    if (this.selectedCalendar) {
      this.body.duration = this.selectedCalendar;
    } else {
      this.body.duration = null;
    }

    this.filterOutput.emit(this.body);
  }
}
