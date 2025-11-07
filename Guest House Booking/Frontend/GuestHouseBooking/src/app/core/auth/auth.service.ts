import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

// This is our .NET API's base URL
const API_URL = 'https://localhost:7170/api'; // <-- IMPORTANT: Check your .NET port!

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A BehaviorSubject holds the current value and notifies subscribers
  private userRole = new BehaviorSubject<string | null>(this.getRoleFromToken());

  // Public "observable" that components can subscribe to
  public userRole$ = this.userRole.asObservable();

  constructor(private http: HttpClient) { }

  login(loginDto: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/auth/login`, loginDto).pipe(
      tap(response => {
        // 1. Save the token
        localStorage.setItem('authToken', response.token);
        
        // 2. Decode token to get role
        const role = this.getRoleFromToken();
        
        // 3. Notify all subscribers that the role has changed
        this.userRole.next(role);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.userRole.next(null); // Notify subscribers of logout
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    
    try {
      // Decode the token (payload is the part between the dots)
      const payload = JSON.parse(atob(token.split('.')[1]));

      // ******************************************************
      // ***** THIS IS THE FIX *****
      // ******************************************************
      // We are now looking for the simple "role" claim, not the long ugly one.
      return payload['role'];
      // ******************************************************

    } catch (e) {
      console.error("Error decoding token", e);
      return null;
    }
  }
}