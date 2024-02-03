import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenuesRoutingModule } from './venues-routing.module';
import { VenuesComponent } from './venues.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VenueFormComponent } from './venue-form/venue-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [VenuesComponent, VenueFormComponent],
  imports: [
    CommonModule,
    VenuesRoutingModule,
    SharedModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    SelectButtonModule,
  ],
})
export class VenuesModule {}
