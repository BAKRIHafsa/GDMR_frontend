// src/app/services/collaborateur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MedecinService {
  private AapiUrl = 'http://localhost:8080/api/admin';
  private CHapiUrl = 'http://localhost:8080/api/chargéRH';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.CHapiUrl}/users/${id}`);
  }

  /* updateMedecin(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/Musers/${id}`, user);
  } */

  getActiveAndCreatedMedecins(): Observable<Map<string, User[]>> {
    return this.http.get<Map<string, User[]>>(`${this.AapiUrl}/ACMedecins`);
  }
  getActiveMedecins(): Observable<Map<string, User[]>> {
    return this.http
      .get<{ [key: string]: User[] }>(`${this.CHapiUrl}/AMedecins`)
      .pipe(map((response) => new Map(Object.entries(response))));
  }
  getArchivedMedecins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.AapiUrl}/AMedecins`);
  }

  archiveUser(id: number): Observable<User> {
    return this.http.put<User>(`${this.AapiUrl}/users/${id}/archive`, {});
  }
  creerMedecin(id: number): Observable<string> {
    return this.http.post<string>(
      `${this.AapiUrl}/users`,
      {idUser: id},
      {
        responseType: 'text' as 'json', // Specify response type as text
      }
    );
  }
}
