import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEmployeeComponent, DialogOverviewExampleDialog, EditEmployeeDialog } from './manage-employee/manage-employee.component';

import { AngularMaterialModule } from './../shared/angular-material.module';
import { ItemOfDayComponent, AddItemOfDayDialog } from './item-of-day/item-of-day.component';
import { ItemMasterListComponent, MaterListAddItemDialog, EditMasterListDialog } from './item-master-list/item-master-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeePortalModule } from './../employee-portal/employee-portal.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    EmployeePortalModule,
    RouterModule,
    MatToolbarModule, 
  ],
  declarations: [ManageEmployeeComponent, ItemOfDayComponent, ItemMasterListComponent, DialogOverviewExampleDialog, MaterListAddItemDialog, EditEmployeeDialog, AddItemOfDayDialog, EditMasterListDialog]
})
export class AdminPortalModule {}