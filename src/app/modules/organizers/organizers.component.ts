import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventOrganizersService } from 'src/app/core/services/event-organizers.service';
import { EventOrganizersFormComponent } from './event-organizers-form/event-organizers-form.component';

@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.scss'],
  providers: [DialogService],
})
export class OrganizersComponent implements OnInit {
  colsData: any[] = [
    {
      field: 'FirstName',
      text: 'Organizer Name',
    },
    {
      field: 'NumberOfEvents',
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
  ];

  actions: any[] = ['canView'];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private eventOrganizersService: EventOrganizersService
  ) {}

  ngOnInit(): void {
    this.getAllEventOrganizers({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getAllEventOrganizers(e: any) {
    this.eventOrganizersService
      .getAllEventOrganizers(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        data.Data.forEach((element: any) => {
          this.rowsData.push({
            Id: element.Id,
            FirstName: element.FirstName,
            LastName: element.LastName,
            Email: element.Email,
            Photo: element.Photo,
            socialLinks: {
              facebook: element.Facebook,
              websiteURL: element.WebsiteURL,
              instagram: element.Instagram,
            },
          });
        });
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  show(data?: any) {
    this.eventOrganizersService.getOrganizerById(data.Id).subscribe((res:any) => {
      this.ref = this.dialogService.open(EventOrganizersFormComponent, {
        header: 'CREATE AN EVENT ORGANIZER',
        width: '80%',
        height: 'auto',
        contentStyle: { overflow: 'auto' },
        maximizable: false,
        data: res.Data,
      });
      this.ref.onClose.subscribe((res) =>
        res ? this.getAllEventOrganizers({ pageNumber: 1, pageSize: 10 }) : ''
      );
    });
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
