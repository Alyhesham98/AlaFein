import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizersRoutingModule } from './organizers-routing.module';
import { OrganizersComponent } from './organizers.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrganizersComponent],
  imports: [CommonModule, OrganizersRoutingModule,SharedModule],
})
export class OrganizersModule {}
