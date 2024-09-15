import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Disponibilite {
  id?: number;
  date: string;
  heuredebut: string;
  heurefin: string;
  medecin: { idUser: number };
}
export interface CreneauModal {
  date: string;
  heuresDisponibles: Disponibilite[];
  heureDebutCreneau: string;
  heureFinCreneau: string;
  typeVisite: string;
  collaborateursIds: number[];
}

@Injectable({
  providedIn: 'root',
})
export class DisponibiliteService {
  private apiUrl = `http://localhost:8080/api`;

  constructor(private http: HttpClient) {}

  ajouterDisponibilite(
    disponibilite: Disponibilite
  ): Observable<Disponibilite> {
    return this.http.post<Disponibilite>(
      `${this.apiUrl}/disponibilites/ajouter`,
      disponibilite
    );
  }

  getDisponibilitesByMedecin(medecinId: number): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(
      `${this.apiUrl}/disponibilites/medecin/${medecinId}`
    );
  }

  supprimerDisponibilite(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/disponibilites/supprimer/${id}`
    );
  }

  /* getDisponibilitesForCurrentMedecin(): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(
      `${this.apiUrl}/disponibilites/current`
    );
  } */

  getCurrentMedecinId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/current-med-id`);
  }

  getDisponibilites(): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(`${this.apiUrl}/disponibilites/all`);
  }
}
