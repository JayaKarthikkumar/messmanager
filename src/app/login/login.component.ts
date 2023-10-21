import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as material from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../userData.service';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private UserService: UserService,
              private auth: AuthService) { }

  username: string = '';
  password: string = '';
  loginForm!: FormGroup;
  showLoader:boolean = false;
  ngOnInit() {
    this.loginForm = new FormGroup({
      formAdminOrEmp: new FormControl('', [Validators.required]),
      formUsername: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      formPassword: new FormControl('', [Validators.required]),
    });
  }
  
  onLogin(event: any, values: { formUsername: string; formPassword: string; formAdminOrEmp: boolean | null }): void {
    this.showLoader = true;
    const self = this;
    this.UserService.getUsers().subscribe((response: any[]) => {
      const user = response.filter((user) => {
        return (
          user.username === values.formUsername &&
          user.password === values.formPassword &&
          ((values.formAdminOrEmp === null) ? false : values.formAdminOrEmp) === user.is_admin
        );
      });
      if (user !== undefined && user.length !== 0) {
        if (!self.auth.loggedIn) {
          self.auth
            .login(values.formUsername, values.formPassword, values.formAdminOrEmp)
            .pipe(first())
            .subscribe((result) => {
              localStorage.setItem('userId', user[0]['id']);
              self.router.navigate([localStorage.getItem('role')]);
            });
        } else {
          self.router.navigate([localStorage.getItem('role')]);
        }
      } else {
        swal.fire('Oops!', 'Invalid Username and Password', 'error'); // Use swal.fire instead of swal
      }
      this.showLoader = false;
    });
  }
  