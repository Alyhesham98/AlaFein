import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit{
  colsData: any[] = [
    {
      field:'Id',
      text:'ID',
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

  constructor(private userService:UsersService){}

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
        this.totalRecords = data.pgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }
}
