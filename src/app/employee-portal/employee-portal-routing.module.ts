import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeePortalComponent } from './employee-portal.component';
import { ViewBalanceComponent } from './view-balance/view-balance.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { MenuListComponent } from './menu-list/menu-list.component';
const routes: Routes = [
    {
        path: 'employee',
        component: EmployeePortalComponent,
        children: [
            { path: 'viewBalance', component: ViewBalanceComponent },
            { path: 'menulist', component: MenuListComponent },
            { path: 'transaction', component: TransactionDetailsComponent }]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }