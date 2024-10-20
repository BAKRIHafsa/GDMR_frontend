import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';


interface LoginResponse {
  access_token: string;
}

export interface UserProfile {
  nom: string;
  prenom: string;
  username: string;
  dateNaissance: string;
  role: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private currentRole: string | null = null;

  constructor(private http: HttpClient) {}

  changePasswordFirst(request: { password: string }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/user/change-password-premier-fois`, request);
  }

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
    this.currentRole = null;
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/profile`).pipe(
      catchError((error) => {
        console.error('Error fetching user profile:', error);
        return throwError(() => new Error('Error fetching user profile'));
      })
    );
  }
  
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getCurrentUserRole(): Observable<{ role: string }> {
    return this.http.get<{ role: string }>(`${this.apiUrl}/user/role`).pipe(
      tap((response) => (this.currentRole = response.role)),
      catchError((error) => {
        console.error('Error fetching user role:', error);
        return throwError(() => new Error('Error fetching user role'));
      })
    );
  }

  getCurrentUserId(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/currentUser`);
  }

  getRole(): string | null {
    return this.currentRole;
  }

  changePassword(request: ChangePasswordRequest): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/user/change-password`, request, {
        responseType: 'text',
      })
      .pipe(
        tap((response) => {
          console.log('Password changed successfully');
        }),
        catchError((error) => {
          console.error('Error changing password:', error);
          return throwError(() => new Error('Error changing password'));
        })
      );
  }
  getCollaborateurs(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/all-collab`);
  }

  getCollaborateursAV(date: string, heureDebut: string, heureFin: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/all-collabAV?date=${date}&heureDebut=${heureDebut}&heureFin=${heureFin}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/create`, user);
  }
}
