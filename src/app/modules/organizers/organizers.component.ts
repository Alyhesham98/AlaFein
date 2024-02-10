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
      field: 'Status',
      text: '# of Events',
    },
    {
      field: 'ExpirationDate',
      text: 'Social Links',
    },
    {
      field: 'Email',
      text: 'Email',
    },
  ];

  actions: any[] = ['canView', 'canDelete'];
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
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  show(data?: any) {
    this.ref = this.dialogService.open(EventOrganizersFormComponent, {
      header: 'CREATE AN EVENT ORGANIZER',
      width: '80%',
      height: 'auto',
      contentStyle: { overflow: 'auto' },
      maximizable: false,
      data: data,
    });

    this.ref.onClose.subscribe((res) =>
      res ? this.getAllEventOrganizers({ pageNumber: 1, pageSize: 10 }) : ''
    );
  }
}
