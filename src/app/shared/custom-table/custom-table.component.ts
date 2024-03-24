import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent {
  @Input() showFilter: boolean = false;
  @Input() showReOrder: boolean = false;
  // For Search
  @Input() showSearch: boolean = true;
  @Input() placeholderSearch!: string;

  // For Filter by Role Dropdown
  @Input() showFilterByRoleDropdown: boolean = false;
  @Input() filterByRoleDropdownList: any[] = [];
  @Input() placeholderFilterByRoleDropdown!: string;
  selectedFilterByRole: any;

  searchByName: any;
  @Input() showSearchByName!: boolean;
  @Input() placeholderSearchByName!: string;
  searchByEmail: any;
  @Input() showSearchByEmail!: boolean;
  @Input() placeholderSearchByEmail!: string;
  searchByEvent: any;
  @Input() showSearchByEvent!: boolean;
  @Input() placeholderSearchByEvent!: string;
  searchByVenue: any;
  @Input() showSearchByVenue!: boolean;
  @Input() placeholderSearchByVenue!: string;

  spotlightDropdown: any;
  spotlightList: any = [
    {
      Name: 'Is Spotlight',
      Value: true,
    },
    {
      Name: 'Not Spotlight',
      Value: false,
    },
  ];
  @Input() showSpotlightDropdown!: boolean;
  @Input() placeholderSpotlightDropdown!: string;

  isApprovedDropdown: any;
  approvedList: any = [
    {
      Name: 'Is Approved',
      Value: true,
    },
    {
      Name: 'Not Approved',
      Value: false,
    },
  ];
  @Input() showApprovedDropdown!: boolean;
  @Input() placeholderIsApprovedDropdown!: string;

  @Input() isDots: boolean = false;
  @Input() isId: boolean = false;
  @Input() isEye: boolean = false;
  @Input() showAction: boolean = true;
  @Input() isRoleList: boolean = false;
  @Input() roleList: any[] = [];
  @Input() cols: any[] = [];
  @Input() rows: any[] = [];
  @Output() pageNumber: EventEmitter<number> = new EventEmitter();
  @Input() pageSize: number = 10;
  @Input() totalRecords!: number;
  @Input() placeholderCompany!: string;
  @Input() actions: any[] = [];
  @Output() dataDetails: EventEmitter<any> = new EventEmitter();
  @Output() confirmCredentail: EventEmitter<any> = new EventEmitter();
  @Output() userStatus: EventEmitter<any> = new EventEmitter();
  @Output() userDetails: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter();
  @Output() userSearch: EventEmitter<any> = new EventEmitter();
  @Output() statusSearch: EventEmitter<any> = new EventEmitter();
  @Output() typeSearch: EventEmitter<any> = new EventEmitter();
  @Output() clientSearch: EventEmitter<any> = new EventEmitter();
  @Output() approvalStatus: EventEmitter<any> = new EventEmitter();
  @Output() approvalSearch: EventEmitter<any> = new EventEmitter();
  @Output() filterOutput: EventEmitter<any> = new EventEmitter();
  @Output() approveDetails: EventEmitter<any> = new EventEmitter();
  @Output() disapproveDetails: EventEmitter<any> = new EventEmitter();
  @Output() spotlightDetails: EventEmitter<any> = new EventEmitter();
  @Output() blockStatus: EventEmitter<any> = new EventEmitter();
  @Output() emailDetails: EventEmitter<any> = new EventEmitter();
  @Output() reOrderDetails: EventEmitter<any> = new EventEmitter();

  userStatusChoice: any;
  searchChoice: any;
  // Define variables to store sorting information
  sortField!: string;
  sortOrder!: number; // 1 for ascending, -1 for descending
  type: any;
  @Input() pageType: any;
  constructor(private router: Router) {}
  page = 0;
  size = 10;
  onPageChange(event: any) {
    if (this.searchChoice) {
      event.name = this.searchChoice;
    } else {
      event.name = null;
    }

    if (this.selectedFilterByRole) {
      event.isApproved = this.selectedFilterByRole === 'yes' ? true : false;
    } else {
      event.isApproved = this.selectedFilterByRole;
    }

    this.pageNumber.emit(event);
  }
  ngOnInit(): void {
    // Initialize sorting variables
    this.sortField = 'defaultColumn'; // Change this to the default sorting column
    this.sortOrder = 1; // Default sort order
  }
  body: any = {};

  onFilterChange(data: any) {
    if (this.searchChoice) {
      this.body.search = this.searchChoice;
    } else {
      this.body.search = null;
    }
    if (this.selectedFilterByRole) {
      this.body.type = this.selectedFilterByRole;
    } else {
      this.body.type = null;
    }

    this.filterOutput.emit(this.body);
  }

  onStatusChange(selectedValue: any) {
    this.statusSearch.emit(selectedValue.value);
  }

  blockChange(selectedValue: any) {
    this.blockStatus.emit(selectedValue);
  }

  onApprovalChange(selectedValue: any) {
    this.approvalStatus.emit(selectedValue);
  }
  onClientChange(selectedValue: any) {
    this.clientSearch.emit(selectedValue.value);
  }
  onTypeChange(selectedValue: any) {
    this.typeSearch.emit(selectedValue.value);
  }

  sortData(field: string): void {
    if (field === this.sortField) {
      // If same column is clicked again, toggle the sort order
      this.sortOrder = -this.sortOrder;
    } else {
      // If a new column is clicked, set the new sort field and default to ascending order
      this.sortField = field;
      this.sortOrder = 1;
    }

    // Perform sorting based on the selected field and order
    this.rows.sort((a, b) => {
      if (this.sortField.includes('.')) {
        // If it does, split the field by dot
        const parts = this.sortField.split('.');
        // Access the nested property using the split parts
        var valueA = a[parts[0]][parts[1]];
        var valueB = b[parts[0]][parts[1]];
        console.log(valueA);
        console.log(valueB);
      } else {
        // Otherwise, proceed with regular property access
        var valueA = a[this.sortField];
        var valueB = b[this.sortField];
        console.log(valueA);
        console.log(valueB);
      }

      if (valueA < valueB) {
        return -1 * this.sortOrder;
      } else if (valueA > valueB) {
        return 1 * this.sortOrder;
      } else {
        return 0;
      }
    });
  }

  onApprovalStatusChange(selectedValue: any) {
    this.approvalSearch.emit(selectedValue.value);
  }

  statusChange(details: any) {
    this.userStatus.emit(details);
  }

  submitCredential(details: any) {
    this.confirmCredentail.emit(details);
  }

  routeDetails(details: any) {
    this.dataDetails.emit(details);
  }
  sendEmail(details: any) {
    this.emailDetails.emit(details);
  }

  approve(details: any) {
    this.approveDetails.emit(details);
  }
  disapprove(details: any) {
    this.disapproveDetails.emit(details);
  }

  spotlight(details: any) {
    this.spotlightDetails.emit(details);
  }
  editRouteDetails(details: any) {
    this.userDetails.emit(details);
  }
  onDelete(details: any) {
    this.onDeleteClicked.emit(details);
  }

  onRowReorder(event: any) {
    const dropIndex = event.dropIndex;

    // Retrieve the data of the rows being reordered
    const droppedRow = this.rows[dropIndex];

    const body = {
      index: dropIndex,
      id: droppedRow.Id,
    };
    this.reOrderDetails.emit(body);
  }

  date!: Date;
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

  search(event: any) {
    this.userSearch.emit(event.target.value);
  }

  onFilterSubmit() {
    if (this.searchChoice) {
      this.body.search = this.searchChoice;
    } else {
      this.body.search = null;
    }

    if (this.searchByName) {
      this.body.name = this.searchByName;
    } else {
      this.body.name = null;
    }

    if (this.searchByEmail) {
      this.body.email = this.searchByEmail;
    } else {
      this.body.email = null;
    }

    if (this.searchByEvent) {
      this.body.event = this.searchByEvent;
    } else {
      this.body.event = null;
    }

    if (this.searchByVenue) {
      this.body.venue = this.searchByVenue;
    } else {
      this.body.venue = null;
    }

    if (this.selectedFilterByRole) {
      this.body.roleFilter = this.selectedFilterByRole;
    } else {
      this.body.roleFilter = null;
    }

    if (this.spotlightDropdown) {
      this.body.isSpotlight = this.spotlightDropdown;
    } else {
      this.body.isSpotlight = null;
    }

    if (this.isApprovedDropdown) {
      this.body.isApproved = this.isApprovedDropdown;
    } else {
      this.body.isApproved = null;
    }

    this.filterOutput.emit(this.body);
  }

  onFilterReset() {
    this.searchChoice = null;
    this.searchByName = null;
    this.searchByEmail = null;
    this.searchByEvent = null;
    this.searchByVenue = null;
    this.selectedFilterByRole = null;
    this.spotlightDropdown = null;
    this.isApprovedDropdown = null;
  }
}
