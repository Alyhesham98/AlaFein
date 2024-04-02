import { Component, OnInit } from '@angular/core';
import { VenuesService } from 'src/app/core/services/venues.service';
import { VenueFormComponent } from './venue-form/venue-form.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { UsersService } from 'src/app/core/services/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss'],
  providers: [DialogService, MessageService],
})
export class VenuesComponent implements OnInit {
  colsData: any[] = [
    {
      field: 'FirstName',
      text: 'Venues Name',
    },
    {
      field: 'location',
      text: 'Location',
    },
    {
      field: 'Facility',
      text: 'Facilities',
    },
    {
      field: 'Email',
      text: 'Email',
    },
    {
      field: 'userStatus',
      text: 'User Status',
    },
    {
      field: 'CreatedAt',
      text: 'Created At',
    },
  ];

  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;
  actions: any[] = ['canVerify'];
  constructor(
    public dialogService: DialogService,
    private venuesService: VenuesService,
    private userService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllVenues({ pageNumber: 1, pageSize: 10 });
  }

  getAllVenues(e: any) {
    this.venuesService
      .getAllVenues(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        data.Data.forEach((element: any) => {
          this.rowsData.push({
            FirstName: element.FirstName,
            location: element.location,
            Facility: element.Facility,
            Email: element.Email,
            userStatus: element.IsBlocked,
            CreatedAt: element.CreatedAt,
          });
        });
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  changeUserBlock(data: any) {
    this.userService.toggleBlock({ id: data.UserId }).subscribe((res: any) => {
      if (res.Succeeded) {
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          summary: 'Success',
          detail: !data.IsBlocked
            ? 'User Verified Successfully!'
            : 'User UnVerified Successfully!',
        });
        this.getAllVenues({ pageNumber: 1, pageSize: 10 });
      } else {
        this.messageService.add({
          key: 'toast1',
          severity: 'error',
          summary: 'Error',
          detail: !data.IsBlocked
            ? 'Error Verified User.'
            : 'Error UnVerified User.',
        });
      }
    });
  }

  show(data?: any) {
    this.ref = this.dialogService.open(VenueFormComponent, {
      header: 'CREATE NEW VENUE',
      width: '80%',
      height: 'auto',
      contentStyle: { overflow: 'auto' },
      maximizable: false,
      data: data,
    });

    this.ref.onClose.subscribe((res) =>
      res === true ? this.getAllVenues({ pageNumber: 1, pageSize: 10 }) : ''
    );
  }
  filter: boolean = false;

  onSearch(event: any) {
    this.filter = true;
    this.venuesService
      .filterVenues({
        pageSize: event?.rows ? event?.rows : this.pageSize,
        pageNumber: event.page ? event.page + 1 : 1,
        name: event.name ? event.name : null,
        email: event.email ? event.email : null,
      })
      .subscribe((res: any) => {
        this.rowsData = res.Data;
        this.pageNumber = res.PageNumber;
        this.pageSize = res.PageSize;
        this.totalRecords = res.PgTotal;
      });
  }
}
