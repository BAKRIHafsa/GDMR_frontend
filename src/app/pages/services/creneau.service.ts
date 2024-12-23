import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



export interface Creneau {
  idCréneau: number;  // Ajoutez cette ligne
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

export interface ModifierCreneauDTO{
  date: string;
  heureDebutVisite: string;
  statusVisite: string;
  heureFinVisite: string;
  medecinId?: number; 

}

export enum StatusVisite {
  PLANIFIE = 'PLANIFIE',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE',
  ANNULE = 'ANNULE',
  VALIDE = 'VALIDE',
  NON_VALIDE = 'NON_VALIDE',
  EN_ATTENTE_CREATION_CRENEAU = 'EN_ATTENTE_CREATION_CRENEAU',
  EN_ATTENTE_VALIDATION = 'EN_ATTENTE_VALIDATION'
}
export interface CreneauRequestDTO {
  motif: string;
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
  getAllCreneaux(): Observable<Creneau[]> {
    return this.http.get<Creneau[]>(`${this.apiUrl}/creneaux/affiche`);
  }

  mettreAJourCreneauVisiteSpontanee(collaborateurId: number, creneauCreationDTO: CreneauCreationRH): Observable<void> {
    const url = `${this.apiUrl}/creneaux/visites-spontanees/${collaborateurId}`;
    return this.http.put<void>(url, creneauCreationDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  modifierStatutCreneau(idCreneau: number, nouveauStatut: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/creneaux/${idCreneau}/statut`, { statut: nouveauStatut });
  }

  modifierVisiteNonValide(idCreneau: number, modifDetails: ModifierCreneauDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/creneaux/${idCreneau}/modification-visite`, modifDetails);
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

  validerCreneau(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/collab/${id}/valider`, {} ,{headers: new HttpHeaders ({
      'content-type':'application/json'
    }),
      responseType:'json'
   }); // API correcte pour la validation
  }
  
  // Méthode pour non-valider un créneau
  nonValiderCreneau(id: number, justification: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/collab/${id}/non-valider`, { justification }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'json' // Attendez une réponse au format JSON
    });
  }
  creerVisiteSpontanee(formData: FormData): Observable<Creneau> {
    return this.http.post<Creneau>(`${this.apiUrl}/collab/creer-visite-spontanee`, formData);
  }

  annulerCreneau(idCreneau: number, motifAnnulation: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/collab/annuler/${idCreneau}`, motifAnnulation, { responseType: 'text' });
  }

  updateCreneauStatusEtEnvoiNotif(idCreneau: number, status: StatusVisite): Observable<any> {
    return this.http.put(`${this.apiUrl}/med/status/${idCreneau}`, 
      JSON.stringify(status),  // Envoyer un objet JSON
        {
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'text'
        }
    );
}



  

  
  
}