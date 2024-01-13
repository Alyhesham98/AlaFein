import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidenavComponent],
})
export class CoreModule {}
