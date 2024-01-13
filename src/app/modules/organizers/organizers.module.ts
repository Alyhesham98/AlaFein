import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizersRoutingModule } from './organizers-routing.module';
import { OrganizersComponent } from './organizers.component';

@NgModule({
  declarations: [OrganizersComponent],
  imports: [CommonModule, OrganizersRoutingModule],
})
export class OrganizersModule {}
