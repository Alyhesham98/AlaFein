import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenuesRoutingModule } from './venues-routing.module';
import { VenuesComponent } from './venues.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VenuesComponent],
  imports: [CommonModule, VenuesRoutingModule,SharedModule],
})
export class VenuesModule {}
