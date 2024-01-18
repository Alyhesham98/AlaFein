import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemTableCardComponent } from './system-table-card/system-table-card.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SystemTableCardComponent],
  imports: [CommonModule, TableModule, DropdownModule, FormsModule],
  exports: [SystemTableCardComponent],
})
export class SharedModule {}
