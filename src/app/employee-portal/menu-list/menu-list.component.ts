import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { UserService } from '../../userData.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from "./../../shared/interface/item.model";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'item_name', 'image', 'price'];
   dataSource = new MatTableDataSource<Item>();
  selection = new SelectionModel<Item>(true, []);
  constructor(private userService: UserService) {

  }
  ngOnInit() {
    const self = this;
    const initialSelection = [];
    const allowMultiSelect = true
    this.userService.getItemList()
      .subscribe((data) => {
        this.dataSource.data = data.filter((dataObj: { quantity: number; }) => {
          return dataObj.quantity > 0;
        });
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  buyItem() {
    const self = this;
    let calcualtePrice = 0;
    let buyItemId;
    let buyItemQuantity;
    this.selection['_selected'].forEach((ele: { price: number; }) => {
      calcualtePrice += ele.price;
    });
    const userName = localStorage.getItem('userName');
    const userId = Number(localStorage.getItem('userId'));
    this.userService.getUserById(userId).subscribe(user => {
      if ((user['balance'] -= calcualtePrice) > 0) {
        user['tranaction_history'].push({
          'userName': userName,
          'amount': calcualtePrice,
          'type': 'Debit',
          'date': new Date()
        });
        this.updateItemQuantity(this.selection['_selected']);
        self.userService.updateUser(user)
          .subscribe(data => {
            swal("Success", "Items purchasing Done!!", "success");
          });

      } else {
        user['balance'] += calcualtePrice;
        swal("Oops!", "Not Enough Balance.Please add amount into your account.", "error");
      }
    })
  }

  updateItemQuantity(selectedItems: any[]): void {
    if (selectedItems.length == 0) return;
    selectedItems.forEach((element: { [x: string]: number; quantity: number; }) => {
      element.quantity = element.quantity - 1;
      this.userService.getItemById(element['id'])
        .subscribe(data => {
          data.quantity = data.quantity - 1;
          this.userService.updateItem(data).subscribe((res) => {
            this.dataSource = new MatTableDataSource<Item>(res);
          });
        });
    });
  }
}

function swal(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}
