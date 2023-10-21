import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../shared/angular-material.module';
import { EmployeePortalComponent } from './employee-portal.component';
import { ViewBalanceComponent } from './view-balance/view-balance.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { EmployeeRoutingModule } from './employee-portal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    EmployeeRoutingModule
  ],
  declarations: [EmployeePortalComponent, ViewBalanceComponent, TransactionDetailsComponent, MenuListComponent]
})
export class EmployeePortalModule { }