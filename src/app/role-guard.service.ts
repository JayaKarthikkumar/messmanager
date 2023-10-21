import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // This will be passed from the route config on the data property
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');

    // Define the JWT decode function using the 'jwt-decode' library
    const jwt_decode = require('jwt-decode');

    // Decode the token to get its payload
    const tokenPayload: any = jwt_decode(token);

    if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
