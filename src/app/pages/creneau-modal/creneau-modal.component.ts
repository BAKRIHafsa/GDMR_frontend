import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreneauModal } from '../services/disponibilite.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-creneau-modal',
  templateUrl: './creneau-modal.component.html',
  styleUrl: './creneau-modal.component.css',
})
export class CreneauModalComponent implements OnInit {
  collaborateurs: User[] = [];
  data = {
    date: '',
    heureDebutCreneau: '',
    heureFinCreneau: '',
    typeVisite: '',
    collaborateursIds: [],
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
    public dialogRef: MatDialogRef<CreneauModalComponent>, // Injection de MatDialogRef
    @Inject(MAT_DIALOG_DATA) public inputData: any // Injection des données de la boîte de dialogue
  ) {}

  ngOnInit(): void {
    this.loadCollaborateurs();
    if (this.inputData) {
      this.data.date = this.inputData.date;
    }
  }

  loadCollaborateurs(): void {
    this.authService.getCollaborateurs().subscribe(
      (data: User[]) => {
        this.collaborateurs = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des collaborateurs:', error);
      }
    );
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
