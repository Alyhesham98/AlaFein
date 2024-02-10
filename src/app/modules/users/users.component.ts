import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService, MessageService],
})
export class UsersComponent implements OnInit {
  colsData: any[] = [
    {
      field: 'Id',
      text: 'ID',
    },
    {
      field: 'FirstName',
      text: 'User name',
    },
    {
      field: 'Status.Name',
      text: 'Status',
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
  actions: any[] = ['canEdit', 'canStatus', 'canBlock', 'canUnblock'];

  types: any[] = [];

  constructor(
    private userService: UsersService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUsers({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getUsers(e: any) {
    this.userService
      .getAllUsers(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  getDropdown() {
    this.userService.getDropdown().subscribe((res: any) => {
      this.types = res.Data;
    });
  }

  changeUserBlock(data: any) {
    this.userService.toggleBlock({ id: data.Id }).subscribe((res: any) => {
      if (res.Succeeded) {
        this.messageService.add({
          key: 'toast1',
          severity: 'success',
          summary: 'Success',
          detail: !data.IsBlocked
            ? 'User Blocked Successfully!'
            : 'User UnBlocked Successfully!',
        });
        this.getUsers({ pageNumber: 1, pageSize: 10 });
      } else {
        this.messageService.add({
          key: 'toast1',
          severity: 'error',
          summary: 'Error',
          detail: !data.IsBlocked
            ? 'Error Blocking User.'
            : 'Error UnBlocking User.',
        });
      }
    });
  }

  changeUserStatus(data: any) {
    this.userService
      .toggleStatus({
        id: data.Id,
        status: data.Status.Name === 'Normal' ? 1 : 0,
      })
      .subscribe((res: any) => {
        if (res.Succeeded) {
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail:
              data.Status.Name === 'Normal'
                ? 'User Status Changed to Premium Successfully!'
                : 'User Status Changed to Normal Successfully!',
          });
          this.getUsers({ pageNumber: 1, pageSize: 10 });
        } else {
          this.messageService.add({
            key: 'toast1',
            severity: 'error',
            summary: 'Error',
            detail: 'Error in Changing Status for User',
          });
        }
      });
  }
}
