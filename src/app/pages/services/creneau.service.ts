import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


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
  chargeRh:  number ;
  collaborateurId: number; 
  dateCreation:string;
}
@Injectable({
  providedIn: 'root',
})
export class CreneauService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  creerCreneau(creneau: CreneauCreationRH): Observable<any> {
    return this.http.post(`${this.apiUrl}/creneaux/creer`, creneau, { responseType: 'text' })
    .pipe(
      catchError(this.handleError)
    );
  }
  getCreneaux(): Observable<Creneau[]> {
    return this.http.get<Creneau[]>(`${this.apiUrl}/collab/affiche`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
