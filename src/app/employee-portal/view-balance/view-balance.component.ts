import { Component, OnInit } from '@angular/core';
import { UserService } from '../../userData.service';
import Swal from 'sweetalert2'; // Use 'Swal' with an uppercase 'S'

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
  styleUrls: ['./view-balance.component.css']
})
export class ViewBalanceComponent implements OnInit {
  currentBalance!: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    if (!isNaN(userId)) {
      this.userService.getUserById(userId).subscribe(response => {
        this.currentBalance = response['balance'];
      });
    }
  }

  addMoney() {
    const self = this;
    Swal.fire({ // Use 'Swal' with an uppercase 'S'
      title: "Enter Amount",
      input: "text",
      inputAttributes: {
        placeholder: "Enter Amount you want to add",
        type: "number", // Ensure the input type is "number"
      },
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (isNaN(value)) {
          Swal.showValidationMessage("Please enter a valid number");
        }
        return value;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const value = parseFloat(result.value);
        if (!isNaN(value)) {
          const userName = localStorage.getItem('userName');
          const id = Number(localStorage.getItem('userId'));
          if (!isNaN(id)) {
            self.userService.getUserById(id).subscribe(user => {
              user['balance'] += value;
              user['transaction_history'].push({
                'userName': userName,
                'amount': value,
                'type': 'credit',
                'date': new Date()
              });
              self.currentBalance = user['balance'];
              self.userService.updateUser(user)
                .subscribe(data => {
                  Swal.fire("Success", "Balance Added successfully!!", "success"); // Use 'Swal' with an uppercase 'S'
                });
            });
          }
        } else {
          Swal.fire("Error", "Please enter a valid number", "error");
        }
      }
    });
  }
}
