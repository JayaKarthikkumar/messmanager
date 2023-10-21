import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from './../../userData.service';
import { Item } from "./../../shared/interface/item.model";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-item-of-day',
  templateUrl: './item-of-day.component.html',
  styleUrls: ['./item-of-day.component.css']
})
export class ItemOfDayComponent implements OnInit {
  title = "Item Of the Day"
  item: Item[] = [];
  displayedColumns: string[] = ['item_name', 'quantity', 'price', 'image', 'actionColumn'];
  dataSource = new MatTableDataSource<Item>();

  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllItemList();

    this.dataSource.filterPredicate = function (data: { item_name: string; }, filter: string): boolean {
      return data.item_name.toLowerCase().includes(filter);
    };
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getAllItemList() {
    this.service.getItemList()
      .subscribe(data => {
        this.dataSource.data = data.filter((dataObj: { is_item_of_day: boolean; quantity: number; }) => {
          return dataObj.is_item_of_day == true && dataObj.quantity > 0;
        });
      });
  }

  removeItemOfDay(item: { id: number; }) {
    this.service.getItemById(item.id)
      .subscribe(data => {
        data.is_item_of_day = false;

        this.service.updateItem(data)
          .subscribe(data => {
            swal("Success", "Removed!!", "success");
          })

      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddItemOfDayDialog, {
      width: '350px'
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}


@Component({
  selector: 'add-item-of-day-dialog',
  templateUrl: './add-item-of-day-dialog.html',
})
export class AddItemOfDayDialog implements OnInit {
  item: Item[] = [];

  addItemOfDayFormGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddItemOfDayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private service: UserService, private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.service.getItemList()
      .subscribe(data => {
        this.item = data.filter((response: { is_item_of_day: any; quantity: number; }) => {
          return !response.is_item_of_day && response.quantity > 0;
        });
      });

    this.addItemOfDayFormGroup = this.formBuilder.group({
      listOfSelectedItems: this.formBuilder.array([])
    });
  }

  onChange(event: { checked: any; source: { value: any; }; }) {
    const selectedItem = <FormArray>this.addItemOfDayFormGroup.get('listOfSelectedItems') as FormArray;

    if (event.checked) {
      selectedItem.push(new FormControl(event.source.value))
    } else {
      const i = selectedItem.controls.findIndex(x => x.value === event.source.value);
      selectedItem.removeAt(i);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addItemofDay() {
    let aa = this.addItemOfDayFormGroup.value["listOfSelectedItems"];
    console.log(aa)

    if (aa.length > 0) {
      this.item.forEach((itemObj) => {
        aa.forEach((element: { id: any; }) => {
          if (itemObj.id == element.id) {
            this.service.getItemById(itemObj.id)
              .subscribe(data => {
                itemObj.is_item_of_day = true;
                this.service.updateItem(itemObj)
                  .subscribe(data => {
                    swal("Success", "Added Item(s) in the list!!", "success");
                    this.dialogRef.close();
                  });

              });

          }
        });
      });
    } else {
      swal("Error", "Please select atleast 1 item", "error");
    }

  }

}

function swal(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}
