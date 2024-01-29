import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: 'admins', component: AdminsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'facilities', component: FacilitiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
