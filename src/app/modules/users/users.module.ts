import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { UsersFormComponent } from './users-form/users-form.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [UsersComponent, UsersFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ToastModule,
    DynamicDialogModule,
    FileUploadModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
  ],
})
export class UsersModule {}
