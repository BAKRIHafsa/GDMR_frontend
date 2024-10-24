import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DossierMedical {
    idDossierMedical?: number; // Optional, as it may not be present when creating a new record
    description: string;
    medicaments: string;
    creneau: {
      idCréneau: number; // Include any necessary properties related to Creneau
    };
  }
  
@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {
  private apiUrl = 'http://localhost:8080/api/dossiers-medicaux'; // Your API URL

  constructor(private http: HttpClient) {}

  ajouterDossierMedical(dossierMedical: DossierMedical): Observable<DossierMedical> {
    return this.http.post<DossierMedical>(`${this.apiUrl}/ajouter`, dossierMedical);
  }

  getDossiersParCollaborateur(idCollaborateur: number): Observable<DossierMedical[]> {
    return this.http.get<DossierMedical[]>(`${this.apiUrl}/collaborateur/${idCollaborateur}`);
  }
  
}
