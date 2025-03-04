import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule, 
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isMobileView = false;
  isLoggedIn = false;
  isAdmin = false; // Új property az admin jog ellenőrzéséhez
  private loginSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Mobil nézet figyelése
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobileView = result.matches;
    });
    // Subscribe to the login state observable
    this.loginSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.isAdmin(); // Ellenőrizzük, hogy Admin-e a felhasználó
      console.log('Bejelentkezett állapot frissítve: ', this.isLoggedIn);
      console.log('Admin állapot: ', this.isAdmin);
      console.log('Bejelentkezett állapot frissítve: ', this.isLoggedIn);
      console.log('Admin állapot: ', this.isAdmin);
    });
  }

  EPDS() {
    window.open('https://www.epds.hu', '_blank');
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.clearSession(); // Clear session from localStorage
      this.router.navigate(['/login']); // Redirect to login page
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}