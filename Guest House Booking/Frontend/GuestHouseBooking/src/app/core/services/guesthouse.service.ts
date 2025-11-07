import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Get the API URL from our AuthService to avoid repeating it
const API_URL = 'https://localhost:7170/api'; // <-- Same API URL

@Injectable({
  providedIn: 'root'
})
export class GuesthouseService {

  constructor(private http: HttpClient) { }

  // We'll define a type for this later
  getGuestHouses(): Observable<any[]> {
    // Now when we make this call, our AuthInterceptor will
    // automatically add the Bearer Token!
    return this.http.get<any[]>(`${API_URL}/GuestHouses`);
  }
}