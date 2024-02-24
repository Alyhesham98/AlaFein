import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [DialogService, MessageService],
})
export class NotificationsComponent {
  colsData: any[] = [
    {
      field: 'Title',
      text: 'Title',
    },
    {
      field: 'Body',
      text: 'Body',
    },
    {
      field: 'Schedule',
      text: 'Schedule',
    },
  ];

  actions: any[] = ['canEdit', 'canDelete'];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private notifcationService: NotificationsService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllNotifcations({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getAllNotifcations(e: any) {
    this.notifcationService
      .getAllNotifications(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }

  show(data?: any) {
    this.ref = this.dialogService.open(NotificationFormComponent, {
      header: 'CREATE NOTIFICATION',
      width: '80%',
      height: '90%',
      contentStyle: { overflow: 'auto' },
      maximizable: false,
      data: data,
    });

    this.ref.onClose.subscribe((res) =>
      res ? this.getAllNotifcations({ pageNumber: 1, pageSize: 10 }) : ''
    );
  }

  deleteNotification(data: any) {
    this.notifcationService
      .deleteNotification(data.Id)
      .subscribe((res: any) => {
        if (res.Succeeded) {
          this.getAllNotifcations({ pageNumber: 1, pageSize: 10 });
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail: 'Notification Deleted Successfully!',
          });
        } else {
          this.messageService.add({
            key: 'toast1',
            severity: 'error',
            summary: 'Error',
            detail: 'Error Deleting Notification.',
          });
        }
      });
  }
}
