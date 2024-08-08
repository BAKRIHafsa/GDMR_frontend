// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Assurez-vous d'importer `tap`

interface LoginResponse {
  access_token: string;
}

interface UserProfile {
  nom: string;
  prenom: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((response) => {
          if (response && response.access_token) {
            sessionStorage.setItem('access_token', response.access_token);
          }
        })
      );
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
  }

  getUserProfile(): Observable<UserProfile> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
