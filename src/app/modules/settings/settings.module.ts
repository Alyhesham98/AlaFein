import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AdminsComponent } from './admins/admins.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { FacilitiesFormComponent } from './facilities/facilities-form/facilities-form.component';
import { AdminFormComponent } from './admins/admin-form/admin-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    SettingsComponent,
    AdminsComponent,
    FacilitiesComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    FacilitiesFormComponent,
    AdminFormComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ToastModule,
    DynamicDialogModule,
    FileUploadModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
  ],
})
export class SettingsModule {}
