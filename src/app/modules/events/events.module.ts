import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllEventsComponent } from './all-events/all-events.component';
import { PendingEventsComponent } from './pending-events/pending-events.component';
import { EventSpotlightComponent } from './event-spotlight/event-spotlight.component';

@NgModule({
  declarations: [
    EventsComponent,
    AllEventsComponent,
    PendingEventsComponent,
    EventSpotlightComponent,
  ],
  imports: [CommonModule, EventsRoutingModule, SharedModule],
})
export class EventsModule {}
