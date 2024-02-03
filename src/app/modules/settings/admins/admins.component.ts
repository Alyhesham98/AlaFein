import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminsService } from 'src/app/core/services/admins.service';
import { AdminFormComponent } from './admin-form/admin-form.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [DialogService],
})
export class AdminsComponent {
  colsData: any[] = [
    {
      field: 'name',
      text: 'Admin name',
    },
    {
      field: 'Status',
      text: 'Type',
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
    private adminsService: AdminsService
  ) {}

  getAllAdmins(e: any) {
    this.adminsService
      .getAllAdmins(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  show(data?: any) {
    this.ref = this.dialogService.open(AdminFormComponent, {
      header: 'CREATE NEW ADMIN',
      width: '80%',
      height: 'auto',
      contentStyle: { overflow: 'auto' },
      maximizable: false,
      data: data,
    });

    // this.ref.onClose.subscribe((res) =>
    //   res ? this.getAllAdmins({ pageNumber: 1, pageSize: 10 }) : ''
    // );
  }
}
