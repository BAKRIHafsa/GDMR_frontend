// src/app/services/collaborateur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Import the User interface

@Injectable({
  providedIn: 'root',
})
export class CollaborateurService {
  private apiUrl = 'http://localhost:8080/api/admin'; // Adjust URL as necessary

  constructor(private http: HttpClient) {}

  getActiveAndCreatedCollaborateursAndChargeRH(): Observable<
    Map<string, User[]>
  > {
    return this.http.get<Map<string, User[]>>(
      `${this.apiUrl}/ACCollaborateursAndChargeRH`
    );
  }

  getArchivedCollaborateursAndChargeRH(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/ACollaborateursAndChargeRH`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  archiveUser(id: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}/archive`, {});
  }
}
