import { Component, OnInit } from '@angular/core';
import { VenuesService } from 'src/app/core/services/venues.service';
import { VenueFormComponent } from './venue-form/venue-form.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss'],
  providers: [DialogService],
})
export class VenuesComponent implements OnInit {
  colsData: any[] = [
    {
      field: 'FirstName',
      text: 'Venues Name',
    },
    {
      field: 'Location',
      text: 'Location',
    },
    {
      field: 'Facilities',
      text: 'Facilities',
    },
    {
      field: 'Email',
      text: 'Email',
    },
  ];

  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private venuesService: VenuesService
  ) {}

  ngOnInit(): void {
    this.getAllVenues({ pageNumber: 1, pageSize: 10 });
  }

  getAllVenues(e: any) {
    this.venuesService
      .getAllVenues(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
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
      res ? this.getAllVenues({ pageNumber: 1, pageSize: 10 }) : ''
    );
  }
}
