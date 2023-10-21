import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { UserService } from '../../userData.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'amount', 'date', 'type'];
  tranactionsArr: any[] = []; // Define the type here

  constructor(private userService: UserService) { }

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    const self = this;
    if (!isNaN(userId)) {
      this.userService.getUserById(userId).subscribe(response => {

        if (response.is_admin) {
          this.userService.getUsers().subscribe(data => {

            let filteredDetails = data.filter((dataObj: { tranaction_history: any[] | undefined; }) => {
              return dataObj.tranaction_history && dataObj.tranaction_history.length > 0;
            });
            let aa: any[] = [];
            filteredDetails.forEach((element: { tranaction_history: any[]; }) => {
              element.tranaction_history.forEach((innerElement: any) => {
                aa.push(innerElement);
              });

            });

            self.tranactionsArr = aa;

          });

        } else {
          self.tranactionsArr = response['tranaction_history'];
        }
      });
    }
  }
}
