import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from './../../userData.service';
import { Employee } from "./../../shared/interface/employee.model";
import { TitleCasePipe } from "./../../shared/pipe/titleCase.pipe";
import { FormControl, FormGroup, Validators } from '@angular/forms';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})

export class ManageEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'empId', 'email', 'location', 'department', 'actionColumn', 'balance' , 'addMoney'];
  public addForm: FormGroup;
  users: Employee[];

  showAddForm: boolean = false;
  showTable: boolean = true;
  currentBalance: number;
  animal: string;
  name: string;
  show: boolean = false;
  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(data => {
        this.users = data;
      });

  }
  editEmployee(employee: Employee, event: Event) {
    this.show = true;
    const dialogRef = this.dialog.open(EditEmployeeDialog, {
      width: '450px',
      data: { name: employee }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
     
  };

  deleteEmployee(employee: Employee, event: Event) {
    let deleteBy = (employee.id) ? employee.id : employee.empId;
    this.service.deleteUser(deleteBy)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== employee);
      });
  };

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: { name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  addMoney(row) {
    let userInfo = row;
    const self = this;
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Enter Amount you want to add",
          type: "text",
        },
      },
    }).then((value) => {
      if(value !== null) {
         value = Number(value);
      }
      if(value !== undefined && typeof value === 'number' && value !== null) {
          const userName = userInfo['username'];
          const id = Number(userInfo['id']);
          if (id !== undefined) {
                self.service.getUserById(id).subscribe(user => {
                  if(user.balance == undefined){
                    user.balance = 0;
                  }
                  user.balance += value;

                  if(user['tranaction_history'] == undefined){
                    user['tranaction_history'] = [];
                  }
                  user['tranaction_history'].push({
                    'username' :userName,
                    'amount': value,
                    'type':'credit',
                    'date':new Date()
                  });
                  self.currentBalance = user['balance'];
                  self.service.updateUser(user)
                        .subscribe(data => {
                          swal("Success", "Balance Added successfully!!", "success");
                  })
              });
          }
        } else {
          swal("Error", "Something went wrong!!", "error");
        }
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  public addForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: UserService, ) { }
  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      empId: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [])
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewUser(addFormObj) {
    console.log(addFormObj);
    if (addFormObj.password == '') {
      addFormObj.password = addFormObj.username;
    }
    this.service.createUser(this.addForm.value)
      .subscribe(data => {
        swal('success', "Employee Details added Successfully.", "success");
      });
  }

  private hasError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  }


}

@Component({
  selector: 'edit-employee-dialog',
  templateUrl: './edit-employee-dialog.html',
})
export class EditEmployeeDialog implements OnInit {
  private editForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private service: UserService, ) { }
  ngOnInit() {
    console.log(this.data);
    this.editForm = new FormGroup({
      name: new FormControl(this.data.name['name'], [Validators.required, Validators.maxLength(10)]),
      username: new FormControl(this.data.name['username'], [Validators.required, Validators.maxLength(10)]),
      empId: new FormControl(this.data.name['empId'], [Validators.required, Validators.maxLength(6)]),
      email: new FormControl(this.data.name['email'], [Validators.required, Validators.email]),
      department: new FormControl(this.data.name['department'], [Validators.required]),
      location: new FormControl(this.data.name['location'], [Validators.required]),
      password: new FormControl(this.data.name['password'], [])
    });
  }
  cancelBtn(): void {
    this.dialogRef.close();
  }

  editUser(editValues) {
    const self = this;
    this.service.getUserById(this.data.name['id'])
      .subscribe(data => {
        const editUser = Object.assign({}, data, editValues);
        self.service.updateUser(editUser)
          .subscribe(data => {
            swal('success', "Employee Details Edited Successfully.");
          });
    });
  }
  private hasError = (controlName: string, errorName: string) => {
      return this.editForm.controls[controlName].hasError(errorName);
  }

}