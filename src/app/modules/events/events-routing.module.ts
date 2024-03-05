import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventSpotlightComponent } from './event-spotlight/event-spotlight.component';
import { PendingEventsComponent } from './pending-events/pending-events.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-events', pathMatch: 'full' },
  { path: 'all-events', component: AllEventsComponent },
  { path: 'event-spotlight', component: EventSpotlightComponent },
  { path: 'pending-events', component: PendingEventsComponent },
  { path: 'event-details/:id/:status/:parentId', component: EventDetailsComponent },
  { path: '**', redirectTo: 'all-events', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
