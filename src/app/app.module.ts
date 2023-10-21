import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './userData.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminPortalModule } from './admin-portal/admin-portal.module';
import { EmployeePortalModule } from './employee-portal/employee-portal.module';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar/';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginComponent,
    AdminPortalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminPortalModule,
    EmployeePortalModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot([]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'], // Update this with your backend domain
        blacklistedRoutes: ['localhost:4000/api/auth'], // Update this with your authentication routes
      } as JwtModuleOptions,
    }),
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Token getter function for JwtModule
export function tokenGetter() {
  return localStorage.getItem('access_token'); // Adjust this based on how your tokens are stored
}
