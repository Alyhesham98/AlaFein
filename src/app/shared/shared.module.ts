import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemTableCardComponent } from './system-table-card/system-table-card.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [SystemTableCardComponent, CustomTableComponent],
  imports: [CommonModule, TableModule, DropdownModule, FormsModule,PaginatorModule,OverlayPanelModule],
  exports: [SystemTableCardComponent,CustomTableComponent],
})
export class SharedModule {}
