import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Antecedant {
  idAntecedant?: number;
  sexe: string;
  height: number;
  weight: number;
  groupeSanguin: string;
  allergies: string;
  medicaments: string;
  fume: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AntecedantService {

  private baseUrl = 'http://localhost:8080/api/antecedants';

  constructor(private http: HttpClient) { }

  getAntecedantForCurrentUser(): Observable<Antecedant> {
    return this.http.get<Antecedant>(`${this.baseUrl}/obtenir`);
  }

  createAntecedant(antecedant: Antecedant): Observable<Antecedant> {
    return this.http.post<Antecedant>(`${this.baseUrl}/ajouter`, antecedant);
  }

  updateAntecedant(antecedantId: number, antecedant: Antecedant): Observable<Antecedant> {
    return this.http.put<Antecedant>(`${this.baseUrl}/modifier/${antecedantId}`, antecedant);
  }
}
