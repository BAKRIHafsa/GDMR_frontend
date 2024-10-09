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
  private MmapiUrl = 'http://localhost:8080/api/med';


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
  /* creerMedecin(id: number, username: string, experience: string, qualification: string, siteTravail: string): Observable<string> {
    const requestBody = {
      idUser: id,
      username: username,
      experience: experience,
      qualification: qualification,
      siteTravail: siteTravail
    };
    
    console.log('Request Body:', requestBody); // Debugging the request body
  
    return this.http.post<string>(
      `${this.AapiUrl}/users`,
      requestBody,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), // Ensuring Content-Type is correct
        responseType: 'text' as 'json',
      }
    );
  } */
    creerMedecin(request: any): Observable<any> {
      return this.http.post<any>(`${this.AapiUrl}/users`, request);
    }

  MedecinsDisponibles(date: string, heureDebut: string, heureFin: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.MmapiUrl}/disponibles?date=${date}&heureDebut=${heureDebut}&heureFin=${heureFin}`);
  }

 /*  activerMedecin(id: number, options: { responseType: 'text' }) {
    return this.http.put(`${this.AapiUrl}/activer/${id}`, null, options);
  } */
    activerMedecin(id: number): Observable<any> {
      return this.http.put(`${this.AapiUrl}/activer/${id}`, {});
    }
}
