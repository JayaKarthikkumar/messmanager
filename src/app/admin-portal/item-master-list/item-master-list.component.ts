import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from './../../userData.service';
import { Item } from './../../shared/interface/item.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'; 

@Component({
  selector: 'app-item-master-list',
  templateUrl: './item-master-list.component.html',
  styleUrls: ['./item-master-list.component.css']
})
export class ItemMasterListComponent implements OnInit {
  title : string = "Master List";
  displayedColumns: string[] = ['item_name', 'quantity', 'price', 'image', 'actionColumn'];
  dataSource = new MatTableDataSource<Item>();
  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getItemList()
      .subscribe(data => {
        this.dataSource.data = data.filter((dataObj: { quantity: number; }) => {
          return dataObj.quantity > 0;
        });
      });

    this.dataSource.filterPredicate = function (data: { item_name: string; }, filter: string): boolean {
      return data.item_name.toLowerCase().includes(filter);
    };
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteItem(item: Item, event: Event) {
    this.service.deleteItem(item.id)
      .subscribe(data => {
        this.dataSource.data = this.dataSource.data.filter((u: any) => u !== item);
      });
  };

  openDialog() {
    const dialogRef = this.dialog.open(MaterListAddItemDialog, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {

    });
  }

   editItem(item: Item, event: Event) {
      const dialogRef = this.dialog.open(EditMasterListDialog, {
      width: '450px',
      data: { selecetedItemData: item }
    });

    dialogRef.afterClosed().subscribe((result: any) => {

    });
     
  };

}



@Component({
  selector: 'mater-list-add-item-dialog',
  templateUrl: './mater-list-add-item-dialog.html',
})
export class MaterListAddItemDialog implements OnInit {
  public itemAddForm!: FormGroup;
  srcResult: any;

  constructor(
    public dialogRef: MatDialogRef<MaterListAddItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private service: UserService, ) { }
  ngOnInit() {
    this.itemAddForm = new FormGroup({
      item_name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      is_item_of_day: new FormControl('', []),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addItem(itemAddFormObj: { image_src: string | undefined; }): void {
    console.log(itemAddFormObj);
    if (itemAddFormObj.image_src == '' || itemAddFormObj.image_src == undefined) {
      itemAddFormObj.image_src = 'assets/img/1.png';
    }
    this.service.addItem(this.itemAddForm.value)
      .subscribe(data => {
        swal('success', "Item added Successfully.", "success");
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.itemAddForm.controls[controlName].hasError(errorName);
  }

}

@Component({
  selector: 'edit-master-list-dialog',
  templateUrl: './edit-master-list-dialog.html',
})
export class EditMasterListDialog implements OnInit {
  private itemEditForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditMasterListDialog>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private service: UserService, ) { }

  ngOnInit() {
    console.log(this.data);
    this.itemEditForm = new FormGroup({
      item_name: new FormControl(this.data.selecetedItemData['item_name'], [Validators.required, Validators.maxLength(25)]),
      quantity: new FormControl(this.data.selecetedItemData['quantity'], [Validators.required]),
      price: new FormControl(this.data.selecetedItemData['price'], [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editItem(editValues: any) {
    const self = this;
    console.log(this.data);
    this.service.getItemById(this.data.selecetedItemData['id'])
      .subscribe(data => {
        const editUser = Object.assign({}, data, editValues);
        self.service.updateItem(editUser)
          .subscribe(data => {
            swal('Success', "Item Details Edited Successfully.", "success");
          });
    });
  }
  private hasError = (controlName: string, errorName: string) => {
      return this.itemEditForm.controls[controlName].hasError(errorName);
  }

}

function swal(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}
