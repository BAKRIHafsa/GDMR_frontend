// src/app/services/collaborateur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Import the User interface

@Injectable({
  providedIn: 'root',
})
export class MedecinService {
  private apiUrl = 'http://localhost:8080/api/admin'; // Adjust URL as necessary

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  /* updateMedecin(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/Musers/${id}`, user);
  } */

  getActiveAndCreatedMedecins(): Observable<Map<string, User[]>> {
    return this.http.get<Map<string, User[]>>(`${this.apiUrl}/ACMedecins`);
  }
  getArchivedMedecins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/AMedecins`);
  }
}
