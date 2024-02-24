import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [NotificationsComponent, NotificationFormComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
  ],
})
export class NotificationsModule {}
