import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemOverviewComponent } from './system-overview/system-overview.component';

@NgModule({
  declarations: [HomeComponent, SystemOverviewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DropdownModule,
    FormsModule,
    SharedModule,
  ],
})
export class HomeModule {}
