import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreneauModal } from '../services/disponibilite.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';


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
  currentStep: 'creneau' | 'medecins' = 'creneau';

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
    public dialogRef: MatDialogRef<CreneauModalComponent>, // Injection de MatDialogRef
    @Inject(MAT_DIALOG_DATA) public inputData: any, // Injection des données de la boîte de dialogue
     private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    if (this.inputData) {
      this.data.date = this.inputData.date;
      // Supposons que vous ayez des heures de début et de fin à partir de `inputData`
      const heureDebut = this.inputData.heureDebut; // Ajustez en fonction de votre structure
      const heureFin = this.inputData.heureFin; // Ajustez en fonction de votre structure

      // Charger les collaborateurs en utilisant la date et les heures fournies
      this.loadCollaborateurs(this.data.date, heureDebut, heureFin);
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
      this.authService.getCollaborateurs(date, heureDebut, heureFin).subscribe(
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

  onNext(): void {
    if (!this.data.date || !this.data.heureDebutVisite || !this.data.heureFinVisite) {
      console.error('Champs obligatoires manquants');
      return;
    }
    
    this.currentStep = 'medecins';
    this.loadMedecinsDisponibles();
  }

  onPrevious(): void {
    this.currentStep = 'creneau';
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
    
  formatTime(time: string): string {
    return time + ":00.000000";
  }
    

  onNoClick(): void {
    this.dialogRef.close();
  }
  selectMedecin(medecinId: number): void {
    this.data.medecinId = medecinId;
  }

}
