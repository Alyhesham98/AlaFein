import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllEventsComponent } from './all-events/all-events.component';
import { PendingEventsComponent } from './pending-events/pending-events.component';
import { EventSpotlightComponent } from './event-spotlight/event-spotlight.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventFormComponent } from './all-events/event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    EventsComponent,
    AllEventsComponent,
    PendingEventsComponent,
    EventSpotlightComponent,
    EventDetailsComponent,
    EventFormComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule,
    CheckboxModule,
  ],
})
export class EventsModule {}
