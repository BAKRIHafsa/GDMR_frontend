import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreneauModal } from '../services/disponibilite.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
import { CreneauService, CreneauCreationRH } from '../services/creneau.service';


@Component({
  selector: 'app-creneau-modal',
  templateUrl: './creneau-modal.component.html',
  styleUrl: './creneau-modal.component.css',
})
export class CreneauModalComponent implements OnInit {
  collaborateurs: User[] = [];
  currentUser!: User;
  medecinsDisponibles: User[] = []; 
  isLoading = false;
  currentStep: 'creneau' | 'collaborateurs' | 'medecins' = 'creneau';

  data: {
    date: string;
    heureDebutVisite: string;
    heureFinVisite: string;
    typeVisite: string;
    collaborateurId: number | null;
    medecinId: number | null;
  } = {
    date: '',
    heureDebutVisite: '',
    heureFinVisite: '',
    typeVisite: '',
    collaborateurId: null, 
    medecinId: null,        
  };
  typeVisiteOptions: string[] = [
    'VISITE_ANNUELLE',
    'VISITE_EMBAUCHE',
    'VISITE_SPONTANEE',
    'VISITE_SUITE_A_UNE_ABSENCE_PROLONGEE',
    'VISITE_SUITE_A_UN_CONGE_DE_MATERNITE_OU_PROLONGATION',
    'VISITE_SUITE_A_UN_ACCIDENT_DU_TRAVAIL_OU_DU_TRAJET',
  ];

  constructor(
    private authService: AuthService,
    private medecinService: MedecinService,
    private creneauService: CreneauService,
    public dialogRef: MatDialogRef<CreneauModalComponent>, // Injection de MatDialogRef
    @Inject(MAT_DIALOG_DATA) public inputData: any, // Injection des données de la boîte de dialogue
     private router: Router
  ) {}

  /* ngOnInit(): void {
    this.loadCurrentUser();
    if (this.inputData) {
      this.data.date = this.inputData.date;
      // Supposons que vous ayez des heures de début et de fin à partir de `inputData`
      const heureDebut = this.inputData.heureDebut; // Ajustez en fonction de votre structure
      const heureFin = this.inputData.heureFin; // Ajustez en fonction de votre structure

      // Charger les collaborateurs en utilisant la date et les heures fournies
      this.loadCollaborateurs(this.data.date, heureDebut, heureFin);
  }
  } */
  ngOnInit(): void {
    this.loadCurrentUser();
    /* if (this.inputData) {
      this.data.date = this.inputData.date;
      const heureDebut = this.inputData.heureDebut || ''; 
      const heureFin = this.inputData.heureFin || '';
  
      if (heureDebut && heureFin) {
        this.loadCollaborateurs(this.data.date, heureDebut, heureFin);
      } else {
        console.error('Heure de début ou heure de fin manquante');
      }
    } */
      if (this.inputData) {
        this.data.date = this.inputData.date;
      }
  }
  
  

  loadCurrentUser(): void {
    this.authService.getCurrentUserId().subscribe(
      (user: User) => {
        this.currentUser = user;
      },
      error => console.error('Erreur lors du chargement de l\'utilisateur courant:', error)
    );
  }

  /* loadCollaborateurs(): void {
    this.authService.getCollaborateurs().subscribe(
      (data: User[]) => {
        this.collaborateurs = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des collaborateurs:', error);
      }
    );
  } */
    loadCollaborateurs(date: string, heureDebut: string, heureFin: string): void {
      if (!heureDebut || !heureFin) {
        console.error('Heure de début ou heure de fin manquante');
        return; // Ne faites pas la requête si les valeurs sont vides
      }
    
      this.authService.getCollaborateursAV(date, heureDebut, heureFin).subscribe(
        (data: User[]) => {
          this.collaborateurs = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des collaborateurs:', error);
        }
      );
    }
    
    
    
  loadMedecinsDisponibles(): void {
    this.isLoading = true;
    this.medecinService.MedecinsDisponibles(
      this.data.date,
      this.formatTime(this.data.heureDebutVisite),
      this.formatTime(this.data.heureFinVisite)
    ).subscribe(
      (medecins: User[]) => {
        this.medecinsDisponibles = medecins;
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors du chargement des médecins disponibles:', error);
        this.isLoading = false;
      }
    );
  }

 /*  onNext(): void {
    if (!this.data.date || !this.data.heureDebutVisite || !this.data.heureFinVisite) {
      console.error('Champs obligatoires manquants');
      return;
    }
    
    this.currentStep = 'medecins';
    this.loadMedecinsDisponibles();
  } */

    /* onNext(): void {
      if (this.currentStep === 'creneau') {
        // Passer à l'étape de sélection des collaborateurs
        if (!this.data.date || !this.data.heureDebutVisite || !this.data.heureFinVisite) {
          console.error('Champs obligatoires manquants');
          return;
        }
        this.currentStep = 'collaborateurs';  // Passer à l'étape suivante
      } else if (this.currentStep === 'collaborateurs') {
        // Passer à l'étape de sélection des médecins
        if (!this.data.collaborateurId) {
          console.error('Aucun collaborateur sélectionné');
          return;
        }
        this.currentStep = 'medecins';
        this.loadMedecinsDisponibles();
      }
    } */
      onNext(): void {
        if (this.currentStep === 'creneau') {
          // Vérifiez que les heures de début et de fin sont définies avant de charger les collaborateurs
          if (!this.data.date || !this.data.heureDebutVisite || !this.data.heureFinVisite) {
            console.error('Champs obligatoires manquants');
            return;
          }
          // Charger les collaborateurs avec les heures définies
          this.loadCollaborateurs(this.data.date, this.data.heureDebutVisite, this.data.heureFinVisite);
          this.currentStep = 'collaborateurs';  // Passer à l'étape suivante
        } else if (this.currentStep === 'collaborateurs') {
          // Passer à l'étape de sélection des médecins
          if (!this.data.collaborateurId) {
            console.error('Aucun collaborateur sélectionné');
            return;
          }
          this.currentStep = 'medecins';
          this.loadMedecinsDisponibles();
        }
      }

  /* onPrevious(): void {
    this.currentStep = 'creneau';
  } */

    onPrevious(): void {
      if (this.currentStep === 'medecins') {
        this.currentStep = 'collaborateurs';  // Retour à l'étape précédente
      } else if (this.currentStep === 'collaborateurs') {
        this.currentStep = 'creneau';
      }
    }

   onSave(): void {
    if (this.data.heureDebutVisite && this.data.heureFinVisite) {
      this.data.heureDebutVisite = this.formatTime(this.data.heureDebutVisite);
      this.data.heureFinVisite = this.formatTime(this.data.heureFinVisite);
    }
    
    if (this.data.date && this.data.heureDebutVisite && 
        this.data.heureFinVisite && this.data.collaborateurId && this.data.medecinId) {
      this.dialogRef.close(this.data);
    } else {
      console.error('Certaines données sont manquantes.');
    }
  } 


     /* onSave(): void {
      if (!this.isDataValid() || !this.currentUser) {
        return;
      }
  
      const creneauData: CreneauCreationRH = {
        ...this.data,
        heureDebutVisite: this.formatTime(this.data.heureDebutVisite),
        heureFinVisite: this.formatTime(this.data.heureFinVisite),
        chargeRh: this.currentUser.idUser, // Utilisation de l'ID au lieu de l'objet User complet
        dateCreation: new Date().toISOString().split('T')[0],
        collaborateurId: this.data.collaborateurId!,
      };
  
      if (this.data.typeVisite === 'VISITE_SPONTANEE') {
        this.creneauService.mettreAJourCreneauVisiteSpontanee(
          this.data.collaborateurId!,
          creneauData
        ).subscribe(
          () => this.dialogRef.close(true),
          error => console.error('Erreur lors de la mise à jour du créneau:', error)
        );
      } else {
        this.creneauService.creerCreneau(creneauData).subscribe(
          () => this.dialogRef.close(true),
          error => console.error('Erreur lors de la création du créneau:', error)
        );
      }
    }
    isDataValid(): boolean {
      return !!(
        this.data.date &&
        this.data.heureDebutVisite &&
        this.data.heureFinVisite &&
        this.data.typeVisite &&
        this.data.collaborateurId &&
        this.data.medecinId &&
        this.currentUser
      );
    }  */
  formatTime(time: string): string {
    return time + ":00.000000";
  }
    

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectMedecin(medecinId: number): void {
    this.data.medecinId = medecinId;
  }

  selectCollaborateur(collaborateurId: number): void {
    this.data.collaborateurId = collaborateurId;
  }

}
