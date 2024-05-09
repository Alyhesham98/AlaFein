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
    this.rowsData = [];
    this.notifcationService
      .getAllNotifications(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        data.Data.forEach((element: any) => {
          const schedule = new Date(element.Schedule);
          const day = schedule.getDate();
          const month = schedule.getMonth() + 1; // Months are zero-indexed
          const year = schedule.getFullYear() % 100; // Getting only the last two digits of the year
          const hours = schedule.getHours();
          const minutes = schedule.getMinutes();
          const seconds = schedule.getSeconds();
          const am_pm = hours >= 12 ? 'PM' : 'AM';
          const formattedSchedule = `${day < 10 ? '0' : ''}${day}/${
            month < 10 ? '0' : ''
          }${month}/${year < 10 ? '0' : ''}${year} ${hours % 12 || 12}:${
            minutes < 10 ? '0' : ''
          }${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${am_pm}`;

          this.rowsData.push({
            Title: element.Title,
            Body: element.Body,
            Schedule: element.Schedule ? formattedSchedule : '-',
          });
        });
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
