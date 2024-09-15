// src/app/services/collaborateur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Import the User interface
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CollaborateurService {
  private AapiUrl = 'http://localhost:8080/api/admin';
  private CHapiUrl = 'http://localhost:8080/api/chargéRH';

  constructor(private http: HttpClient) {}

  getActiveAndCreatedCollaborateursAndChargeRH(): Observable<
    Map<string, User[]>
  > {
    return this.http.get<Map<string, User[]>>(
      `${this.AapiUrl}/ACCollaborateursAndChargeRH`
    );
  }

  getActiveCollaborateursAndChargeRH(): Observable<Map<string, User[]>> {
    return this.http
      .get<{ [key: string]: User[] }>(`${this.CHapiUrl}/ACollaborateurs`)
      .pipe(map((response) => new Map(Object.entries(response))));
  }

  getArchivedCollaborateursAndChargeRH(): Observable<User[]> {
    return this.http.get<User[]>(`${this.AapiUrl}/ACollaborateursAndChargeRH`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.AapiUrl}/users/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.AapiUrl}/users/${id}`, user);
  }

  archiveUser(id: number): Observable<User> {
    return this.http.put<User>(`${this.AapiUrl}/users/${id}/archive`, {});
  }
  creerCollaborateur(id: number): Observable<string> {
    return this.http.post<string>(
      `${this.AapiUrl}/users/${id}`,
      {},
      {
        responseType: 'text' as 'json', // Specify response type as text
      }
    );
  }
}
