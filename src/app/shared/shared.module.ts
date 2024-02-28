import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemTableCardComponent } from './system-table-card/system-table-card.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputFieldComponent } from './input-field/input-field.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    SystemTableCardComponent,
    CustomTableComponent,
    InputFieldComponent,
    FileUploadComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    FormsModule,
    PaginatorModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
    DragDropModule,
  ],
  exports: [
    SystemTableCardComponent,
    CustomTableComponent,
    InputFieldComponent,
    LoaderComponent
  ],
})
export class SharedModule {}
