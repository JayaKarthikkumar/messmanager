import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService,private http: HttpClient, private router: Router) {}
 
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  login(username: string, password: string, is_admin: boolean): Observable<boolean> {
    const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
    return this.http.post<{token: string}>('http://localhost:4000/api/auth', {username: username, password: password},httpOptions,)
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result['token']);
          localStorage.setItem('role', is_admin ? 'admin' : 'employee');
          localStorage.setItem('userName', username);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

}