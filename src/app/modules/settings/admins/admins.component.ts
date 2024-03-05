import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminsService } from 'src/app/core/services/admins.service';
import { AdminFormComponent } from './admin-form/admin-form.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [DialogService],
})
export class AdminsComponent implements OnInit {
  colsData: any[] = [
    {
      field: 'FirstName',
      text: 'Admin name',
    },
    {
      field: 'RoleName',
      text: 'Type',
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
  adminRoles = [];
  filter: boolean = false;
  constructor(
    public dialogService: DialogService,
    private adminsService: AdminsService
  ) {}

  ngOnInit(): void {
    this.getAllAdmins({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });

    this.getDropdowns();
  }

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

  getDropdowns() {
    this.adminsService.getAdminsDropdown().subscribe((res: any) => {
      this.adminRoles = res.Data;
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

    this.ref.onClose.subscribe((res) =>
      res ? this.getAllAdmins({ pageNumber: 1, pageSize: 10 }) : ''
    );
  }

  onSearch(event: any) {
    this.filter = true;
    this.adminsService
      .filterAdmin({
        pageSize: event?.rows ? event?.rows : this.pageSize,
        pageNumber: event.page ? event.page + 1 : 1,
        search: event.search ? event.search : null,
        roleFilter: event.roleFilter ? event.roleFilter : null,
      })
      .subscribe((res: any) => {
        this.rowsData = res.Data;
        this.pageNumber = res.PageNumber;
        this.pageSize = res.PageSize;
        this.totalRecords = res.PgTotal;
      });
  }
}
