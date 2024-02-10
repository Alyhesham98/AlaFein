import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommentsService } from 'src/app/core/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [MessageService],
})
export class CommentsComponent implements OnInit {
  colsData: any[] = [
    {
      field: 'Comment',
      text: 'Name',
    },
    {
      field: 'Status',
      text: 'Status',
    },
    {
      field: 'ExpirationDate',
      text: 'Expire Date',
    },
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  constructor(
    private commentService: CommentsService,
    public messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getList(e: any) {
    this.commentService
      .getAllComments(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }
  actions: any[] = ['canApprove', 'canDecline'];

  toggleCommentStatus(data: any) {
    this.commentService
      .toggleCommentStatus({ id: data.Id })
      .subscribe((res: any) => {
        if (res.Succeeded) {
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail: data.IsPublished
              ? 'Comment Published Successfully!'
              : 'Comment Archived Successfully!',
          });
          this.getList({ pageNumber: 1, pageSize: 10 });
        } else {
          this.messageService.add({
            key: 'toast1',
            severity: 'error',
            summary: 'Error',
            detail: data.IsPublished
              ? 'Error Comment Category.'
              : 'Error Comment Category.',
          });
        }
      });
  }
}
