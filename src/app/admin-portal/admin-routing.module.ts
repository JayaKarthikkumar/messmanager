import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageEmployeeComponent } from "./manage-employee/manage-employee.component";
import { AdminPortalComponent } from "./admin-portal.component";
import { ItemOfDayComponent } from "./item-of-day/item-of-day.component";
import { ItemMasterListComponent } from "./item-master-list/item-master-list.component";
import { TransactionDetailsComponent } from './../employee-portal/transaction-details/transaction-details.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminPortalComponent,
        children: [
            { path: 'employee', component: ManageEmployeeComponent },
            { path: 'item-of-day', component: ItemOfDayComponent },
            { path: 'masterlist', component: ItemMasterListComponent },
            { path: 'transaction', component: TransactionDetailsComponent }]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }