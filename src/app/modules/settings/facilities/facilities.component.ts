import { Component } from '@angular/core';
import { FacilitiesService } from 'src/app/core/services/facilities.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent {
  colsData: any[] = [
    {
      text:'ID',
      field:'Id'
    },
    {
      field: 'ImagePath',
      text: 'Facility Image',
    },
    {
      field: 'ImageName',
      text: 'Facility Name',
    },
  
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;

  constructor(private facilityService: FacilitiesService) {}

  ngOnInit(): void {
    this.getFacilities({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getFacilities(e: any) {
    this.facilityService
      .getAllFacilities(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.pgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }
}
