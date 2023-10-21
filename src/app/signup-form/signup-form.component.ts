import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms'; // Import AbstractControl
import { Router } from '@angular/router';
import { UserService } from '../userData.service';
import Swal from 'sweetalert2'; // Import Swal from 'sweetalert2'
import { Employee } from './../shared/interface/employee.model';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  public empForm!: FormGroup;

  constructor(private router: Router, private apiService: UserService) {}

  ngOnInit() {
    this.empForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      empId: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      is_admin: new FormControl('', []),
    }, { validators: this.pwdMatchValidator }); // Add 'validators' key

    // Initialize your form controls here
  }

  pwdMatchValidator(frm: AbstractControl): { [key: string]: boolean } | null {
    const password = this.empForm.get('password')?.value;
    const confirmPassword = frm.value; // Use frm.value

    if (password === confirmPassword) {
      return null; // Validation passes
    } else {
      return { mismatch: true }; // Validation fails
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.empForm.controls[controlName].hasError(errorName);
  }

  public createUser() {
    if (this.empForm.valid) {
      const userData = { ...this.empForm.value, balance: 0, transaction_history: [] }; // Create user data object

      this.apiService.createUser(userData).subscribe(data => {
        Swal.fire('Success', 'User Registered successfully!!', 'success'); // Use Swal.fire for latest versions
        this.router.navigate(['login']);
      });
    } else {
      Swal.fire('Oops!', 'Please fill all the required details!', 'error'); // Use Swal.fire for latest versions
    }
  }
}
