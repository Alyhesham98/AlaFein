import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventOrganizersService } from 'src/app/core/services/event-organizers.service';
import { EventOrganizersFormComponent } from './event-organizers-form/event-organizers-form.component';
import { UsersService } from 'src/app/core/services/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.scss'],
  providers: [DialogService, MessageService],
})
export class OrganizersComponent implements OnInit {
  colsData: any[] = [
    {
      field: 'FirstName',
      text: 'Organizer Name',
    },
    {
      field: 'EventCount',
      text: '# of Events',
    },
    {
      field: 'socialLinks',
      text: 'Social Links',
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

  actions: any[] = ['canView', 'canVerify'];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private eventOrganizersService: EventOrganizersService,
    private userService: UsersService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllEventOrganizers({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
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
        this.getAllEventOrganizers({ pageNumber: 1, pageSize: 10 });
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

  getAllEventOrganizers(e: any) {
    this.rowsData = [];
    this.eventOrganizersService
      .getAllEventOrganizers(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        if (data.Data) {


          data.Data.forEach((element: any) => {
            this.rowsData.push({
              UserId: element.UserId,
              Id: element.Id,
              FirstName: element.FirstName,
              LastName: element.LastName,
              Email: element.Email,
              Photo: element.Photo,
              EventCount: element.EventCount,
              userStatus: element.IsBlocked,
              CreatedAt: element.CreatedAt,
              socialLinks: {
                facebook: element.Facebook,
                websiteURL: element.WebsiteURL,
                instagram: element.Instagram,
              },
            });
          });
        }
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  show(data?: any) {
    if (data?.Id) {
      this.eventOrganizersService
        .getOrganizerById(data.Id)
        .subscribe((res: any) => {
          let body = {
            id: data.Id,
            organizer: res.Data,
          };
          this.ref = this.dialogService.open(EventOrganizersFormComponent, {
            header: 'CREATE AN EVENT ORGANIZER',
            width: '80%',
            height: 'auto',
            contentStyle: { overflow: 'auto' },
            maximizable: false,
            data: body,
          });
          this.ref.onClose.subscribe((res) =>
            res === true
              ? this.getAllEventOrganizers({ pageNumber: 1, pageSize: 10 })
              : ''
          );
        });
    } else {
      this.ref = this.dialogService.open(EventOrganizersFormComponent, {
        header: 'CREATE AN EVENT ORGANIZER',
        width: '80%',
        height: 'auto',
        contentStyle: { overflow: 'auto' },
        maximizable: false,
      });
      this.ref.onClose.subscribe((res) =>
        res ? this.getAllEventOrganizers({ pageNumber: 1, pageSize: 10 }) : ''
      );
    }
  }

  filter: boolean = false;

  onSearch(event: any) {
    this.filter = true;
    this.eventOrganizersService
      .filterEventsOrganizers({
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
