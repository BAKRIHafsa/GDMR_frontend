import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Creneau {
  idCréneau: number;
  date: string;
  heureDebutVisite: string;
  heureFinVisite: string;
  typeVisite: string;
  statusVisite: string;
  motif: string;
  justifNonValide: string;
  justifAnnuleMedecin: string;
  justifAnnuleCollaborateur: string;
  medecin: {
    idUser: number;
    nom: string;
    prenom: string;
    siteTravail: string;
    specialite: string;
    qualification: string;
    experience: string;
  };
  collaborateur: { idUser: number; nom: string; prenom: string };
  chargeRh: { idUser: number; nom: string; prenom: string };
}

export interface CreneauCreationRH {
  date: string;
  heureDebutVisite: string;
  heureFinVisite: string;
  typeVisite: string;
  chargeRh: { idUser: number };
  collaborateursIds: number[]; // Liste des IDs des collaborateurs concernés
}
@Injectable({
  providedIn: 'root',
})
export class CreneauService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  creerCreneau(creneau: CreneauCreationRH): Observable<String> {
    return this.http.post<String>(`${this.apiUrl}/creneaux/creer`, creneau);
  }
  getCreneaux(): Observable<Creneau[]> {
    return this.http.get<Creneau[]>(`${this.apiUrl}/collab/affiche`);
  }
}
