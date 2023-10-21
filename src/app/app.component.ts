import { Component, NgModule } from '@angular/core';
import { AngularMaterialModule } from './shared/angular-material.module';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    // Your components
  ],
  imports: [
    BrowserModule,
    MatCardModule, // Add MatCardModule to the imports array
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule { }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class AppComponent {
  logoutFlag: boolean = false;
  constructor(private auth: AuthService, private router: Router) {
   }
   logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}