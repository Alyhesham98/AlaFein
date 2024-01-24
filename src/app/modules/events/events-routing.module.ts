import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventSpotlightComponent } from './event-spotlight/event-spotlight.component';
import { PendingEventsComponent } from './pending-events/pending-events.component';

const routes: Routes = [
  { path: 'all-events', component: EventsComponent },
  { path: 'event-spotlight', component: EventSpotlightComponent },
  { path: 'pending-events', component: PendingEventsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
