import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizersRoutingModule } from './organizers-routing.module';
import { OrganizersComponent } from './organizers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventOrganizersFormComponent } from './event-organizers-form/event-organizers-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [OrganizersComponent, EventOrganizersFormComponent],
  imports: [
    CommonModule,
    OrganizersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule
  ],
})
export class OrganizersModule {}
