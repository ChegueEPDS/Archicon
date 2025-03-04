import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable to track login state

  constructor(private http: HttpClient) {}

  // Register user
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // Logout user
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  // Store user session (JWT token) in localStorage
  setSession(token: string) {
    console.log('Token saved to session:', token);
    const tokenData = this.parseJwt(token);
    console.log('Parsed token data:', tokenData); // Ellenőrizzük, hogy mi van a tokenben
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true); // Notify that the user is logged in
  }

  // Remove session
  clearSession() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false); // Notify that the user is logged out
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
  
    const tokenData = this.parseJwt(token);
    const expirationDate = tokenData.exp * 1000;
  
    if (Date.now() >= expirationDate) {
      this.clearSession();
      return false;
    }
  
    return true;
  }
  
  // JWT Parsing
  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

  // Get the role of the user from the JWT token
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const tokenData = this.parseJwt(token);
    return tokenData.role || null; // Role extracted from the token
  }

  // Check if the user is Admin
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'Admin'; // Only return true if the role is 'Admin'
  }
}