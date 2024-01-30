import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent {
  @Input() isDots: boolean = false;
  @Input() isId: boolean = false;
  @Input() isEye: boolean = false;
  @Input() showAction: boolean = true;
  @Input() isSortClearBtn: boolean = false;
  @Input() isSearch: boolean = true;
  @Input() isStatusList: boolean = false;
  @Input() isCompanyList: boolean = false;
  @Input() isCompanyFilterList: boolean = false;
  @Input() companyList: any[] = [];
  @Input() statusList: any[] = [];
  @Input() userStatusList: any[] = [];
  @Input() companiesList: any[] = [];
  @Input() isCountryList: boolean = false;
  @Input() countryList: any[] = [];
  @Input() isTypeList: boolean = false;
  @Input() typeList: any[] = [];
  @Input() clientList: any[] = [];
  @Input() isRoleList: boolean = false;
  @Input() roleList: any[] = [];
  @Input() isClientFilterList: boolean = false;
  @Input() cols: any[] = [];
  @Input() rows: any[] = [];
  @Output() pageNumber: EventEmitter<number> = new EventEmitter();
  @Input() pageSize: number = 10;
  @Input() totalRecords!: number;
  @Input() placeholderStatus!: string;
  @Input() placeholderUserStatus!: string;
  @Input() placeholderCompany!: string;
  @Input() placeholderCountry!: string;
  @Input() placeholderSearch!: string;
  @Input() placeholderClient!: string;
  @Input() placeholderType!: string;
  @Input() placeholderApproval!: string;
  @Input() isUserStatusList: boolean = false;
  @Input() approvalStatusList: boolean = false;
  @Input() actions: any[] = [];
  @Input() filter: boolean = false;
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

  @Output() emailDetails: EventEmitter<any> = new EventEmitter();

  userStatusChoice: any;
  companyListChoice: any;
  StatusChoice: any;
  companyChoice: any;
  hospitalChoice: any;
  clientListChoice: any;
  approvalStatusChoice: any;
  typeChoice: any;
  searchChoice: any;
  countryChoice: any;
  approval: any[] = [
    {
      name: 'Approved',
      code: 'approve',
    },
    {
      name: 'Unapproved',
      code: 'unapprove',
    },
  ];
  type: any;
  @Input() pageType:any;
  constructor(
    private router: Router
  ) {

  }
  page = 0;
  size = 10;
  onPageChange(event: any) {
    if (this.searchChoice) {
      event.search = this.searchChoice;
    } else {
      event.search = null;
    }

    if (this.countryChoice) {
      event.countryId = this.countryChoice;
    } else {
      event.countryId = null;
    }

    if (this.hospitalChoice) {
      event.facilityId = this.hospitalChoice;
    } else {
      event.facilityId = null;
    }

    if (this.typeChoice) {
      event.type = this.typeChoice;
    } else {
      event.type = null;
    }

    if (this.approvalStatusChoice) {
      event.adminApproved =
        this.approvalStatusChoice === 'approve' ? true : false;
    } else {
      event.adminApproved = null;
    }

    if (this.clientListChoice) {
      event.client = this.clientListChoice;
    } else {
      event.client = null;
    }

    let submStatus = this.StatusChoice?.toString();
    let userStatus = this.userStatusChoice?.toString();

    if (submStatus) {
      event.status = submStatus;
    } else if (!userStatus && !submStatus) {
      event.status = null;
    }

    if (userStatus) {
      event.status = userStatus;
    } else if (!userStatus && !submStatus) {
      event.status = null;
    }

    this.pageNumber.emit(event);
  }
  ngOnInit(): void {}
  body: any = {};
  filterChange(data: any) {
    if (this.searchChoice) {
      this.body.search = this.searchChoice;
    } else {
      this.body.search = null;
    }

    if (this.hospitalChoice) {
      this.body.facilityId = this.hospitalChoice;
    } else {
      this.body.facilityId = null;
    }

    if (this.countryChoice) {
      this.body.countryId = this.countryChoice;
    } else {
      this.body.countryId = null;
    }

    if (this.typeChoice) {
      this.body.type = this.typeChoice;
    } else {
      this.body.type = null;
    }

    if (this.approvalStatusChoice) {
      this.body.adminApproved =
        this.approvalStatusChoice === 'approve' ? true : false;
    } else {
      this.body.adminApproved = null;
    }

    if (this.clientListChoice) {
      this.body.client = this.clientListChoice;
    } else {
      this.body.client = null;
    }
    if (this.companyChoice) {
      this.body.company = this.companyChoice;
    } else {
      this.body.company = null;
    }

    let submStatus = this.StatusChoice?.toString();
    let userStatus = this.userStatusChoice?.toString();

    if (submStatus) {
      this.body.status = submStatus;
    } else if (!userStatus && !submStatus) {
      this.body.status = null;
    }

    if (userStatus) {
      this.body.status = userStatus;
    } else if (!userStatus && !submStatus) {
      this.body.status = null;
    }

    this.filterOutput.emit(this.body);
  }

  onStatusChange(selectedValue: any) {
    this.statusSearch.emit(selectedValue.value);
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

  onApprovalStatusChange(selectedValue: any) {
    this.approvalSearch.emit(selectedValue.value);
  }

  statusChange(details: any) {
    this.userStatus.emit(details);
  }

  clear(table: Table) {
    table.clear();
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
}
