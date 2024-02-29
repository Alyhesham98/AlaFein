import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FacilitiesService } from 'src/app/core/services/facilities.service';
import { FacilitiesFormComponent } from './facilities-form/facilities-form.component';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
  providers: [DialogService, MessageService],
})
export class FacilitiesComponent {
  colsData: any[] = [
    {
      text: 'ID',
      field: 'Id',
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
  ref: DynamicDialogRef | undefined;
  actions: any[] = ['canEdit', 'canDelete'];
  constructor(
    private facilityService: FacilitiesService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getFacilities({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
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

  show(data?: any) {
    this.ref = this.dialogService.open(FacilitiesFormComponent, {
      header: data ? 'Edit Facility' : 'Add New Facility',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      data: data,
    });

    this.ref.onClose.subscribe((res) =>
      res ? this.getFacilities({ pageNumber: 1, pageSize: 10 }) : ''
    );
  }

  onDeleteFacility(data: any) {
    this.facilityService.deleteFacility(data.Id).subscribe((res: any) => {
      if (res.Succeeded) {
        this.getFacilities({ pageNumber: 1, pageSize: 10 });
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          summary: 'Success',
          detail: 'Facility Deleted Successfully!',
        });
      } else {
        this.messageService.add({
          key: 'toast1',
          severity: 'error',
          summary: 'Error',
          detail: 'Error Deleting Facility.',
        });
      }
    });
  }
  
}
