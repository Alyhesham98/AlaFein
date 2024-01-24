import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AdminsComponent } from './admins/admins.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SettingsComponent, AdminsComponent, FacilitiesComponent, CategoriesComponent],
  imports: [CommonModule, SettingsRoutingModule,SharedModule],
})
export class SettingsModule {}
