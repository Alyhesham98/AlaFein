import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [CommentsComponent],
  imports: [CommonModule, CommentsRoutingModule, SharedModule, ToastModule],
})
export class CommentsModule {}
